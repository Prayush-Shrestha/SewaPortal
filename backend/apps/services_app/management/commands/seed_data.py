"""Seed demo data for local development."""
import random
from datetime import date, timedelta
from decimal import Decimal

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.applications.models import Application, ApplicationStatusHistory
from apps.community.models import CommunityIssue, Poll, PollOption, PollVote
from apps.documents.models import Document
from apps.notifications.models import Notification
from apps.payments.models import Fine, Payment
from apps.services_app.models import Service


class Command(BaseCommand):
    help = "Seed services, users, documents, applications, payments, polls, issues, notifications."

    def handle(self, *args, **options):
        self.stdout.write("Seeding data...")

        # --- Services ---
        services_data = [
            {
                "slug": "national-id",
                "name": "National ID Card",
                "description": "Apply for a new National Identity Card (Rastriya Parichaya Patra). Required for all Nepali citizens above 16.",
                "required_documents": ["Citizenship certificate", "Passport-size photo", "Birth certificate"],
                "processing_days": 15,
                "fee": Decimal("500.00"),
                "icon": "id-card",
            },
            {
                "slug": "driving-license",
                "name": "Driving License",
                "description": "Apply for a new driving license (trial + written exam) via Department of Transport Management.",
                "required_documents": ["Citizenship certificate", "Medical report", "Passport-size photo"],
                "processing_days": 30,
                "fee": Decimal("1500.00"),
                "icon": "car",
            },
            {
                "slug": "pan",
                "name": "PAN Card",
                "description": "Permanent Account Number registration with Inland Revenue Department for tax purposes.",
                "required_documents": ["Citizenship certificate", "Passport-size photo"],
                "processing_days": 3,
                "fee": Decimal("0.00"),
                "icon": "file-text",
            },
            {
                "slug": "voter-card",
                "name": "Voter ID Card",
                "description": "Register on the voter roll with the Election Commission of Nepal.",
                "required_documents": ["Citizenship certificate", "Migration certificate (if applicable)"],
                "processing_days": 10,
                "fee": Decimal("0.00"),
                "icon": "vote",
            },
            {
                "slug": "bluebook",
                "name": "Vehicle Bluebook Renewal",
                "description": "Renew your vehicle registration certificate (Bluebook) including tax clearance.",
                "required_documents": ["Bluebook copy", "Insurance papers", "Tax receipt"],
                "processing_days": 5,
                "fee": Decimal("2500.00"),
                "icon": "book",
            },
        ]
        services = {}
        for s in services_data:
            obj, _ = Service.objects.update_or_create(
                slug=s["slug"], defaults={**s, "is_active": True}
            )
            services[s["slug"]] = obj
        self.stdout.write(f"  services: {len(services)}")

        # --- Users ---
        admin, created = User.objects.get_or_create(
            username="admin",
            defaults={"email": "admin@example.com", "is_staff": True, "is_superuser": True},
        )
        admin.set_password("admin123")
        admin.is_staff = True
        admin.is_superuser = True
        admin.save()

        demo_users = [
            ("ram.sharma", "Ram", "Sharma", "ram@example.com"),
            ("sita.thapa", "Sita", "Thapa", "sita@example.com"),
            ("hari.bahadur", "Hari", "Bahadur", "hari@example.com"),
            ("gita.karki", "Gita", "Karki", "gita@example.com"),
            ("bikash.rai", "Bikash", "Rai", "bikash@example.com"),
            ("anita.shrestha", "Anita", "Shrestha", "anita@example.com"),
        ]
        users = []
        phones = ["9841000001", "9851000002", "9842000003", "9861000004", "9843000005", "9852000006"]
        addresses = [
            "Baneshwor, Kathmandu",
            "Lakeside, Pokhara",
            "Pulchowk, Lalitpur",
            "Dharan, Sunsari",
            "Butwal, Rupandehi",
            "Thamel, Kathmandu",
        ]
        for i, (username, first, last, email) in enumerate(demo_users):
            u, _ = User.objects.get_or_create(
                username=username,
                defaults={"first_name": first, "last_name": last, "email": email},
            )
            u.set_password("password123")
            u.first_name = first
            u.last_name = last
            u.email = email
            u.save()
            profile = getattr(u, "profile", None)
            if profile is not None:
                profile.phone = phones[i]
                profile.address = addresses[i]
                profile.citizenship_no = f"27-01-70-{10000 + i}"
                profile.save()
            users.append(u)
        self.stdout.write(f"  users: {len(users)} + admin")

        # --- Documents ---
        categories = ["citizenship", "national_id", "pan", "driving_license", "passport"]
        for i, u in enumerate(users):
            cat = categories[i % len(categories)]
            Document.objects.get_or_create(
                user=u,
                name=f"{cat.replace('_', ' ').title()} of {u.first_name}",
                defaults={
                    "category": cat,
                    "document_number": f"DOC-{202600 + i}",
                    "file": f"documents/demo-{cat}-{u.username}.pdf",
                    "status": random.choice(["pending", "verified", "verified"]),
                },
            )

        # --- Applications with varied statuses ---
        statuses = ["submitted", "under_review", "processing", "approved", "rejected", "requires_action"]
        slugs = list(services.keys())
        prefix_map = {
            "national-id": "NID",
            "driving-license": "DL",
            "pan": "PAN",
            "voter-card": "VTR",
            "bluebook": "BLB",
        }
        for i, u in enumerate(users):
            slug = slugs[i % len(slugs)]
            svc = services[slug]
            app_id = f"{prefix_map[slug]}-2026-{1000 + i}"
            app, created = Application.objects.get_or_create(
                application_id=app_id,
                defaults={
                    "user": u,
                    "service": svc,
                    "full_name": f"{u.first_name} {u.last_name}",
                    "dob": date(1990 + (i % 10), 1 + (i % 12), 1 + (i % 27)),
                    "address": addresses[i],
                    "phone": phones[i],
                    "citizenship_no": f"27-01-70-{10000 + i}",
                    "extra_data": {"ward": (i % 32) + 1, "municipality": "Kathmandu"},
                    "status": statuses[i % len(statuses)],
                    "remarks": "",
                },
            )
            if not created:
                app.status = statuses[i % len(statuses)]
                app.save()
            if app.status != "submitted":
                ApplicationStatusHistory.objects.get_or_create(
                    application=app,
                    from_status="submitted",
                    to_status=app.status,
                    defaults={"changed_by": admin, "comment": f"Seeded transition to {app.status}"},
                )

        # --- Payments ---
        for i, u in enumerate(users[:4]):
            Payment.objects.get_or_create(
                reference=f"PAY-2026-{2000 + i}",
                defaults={
                    "user": u,
                    "service_name": list(services.values())[i % len(services)].name,
                    "amount": list(services.values())[i % len(services)].fee or Decimal("500.00"),
                    "status": "paid" if i % 2 == 0 else "pending",
                    "method": "eSewa" if i % 2 == 0 else "Khalti",
                    "paid_at": timezone.now() if i % 2 == 0 else None,
                },
            )

        # --- Fines (traffic violations in Kathmandu/Lalitpur) ---
        fines_data = [
            ("Helmet violation", "Baneshwor Chowk, Kathmandu", Decimal("500.00"), "unpaid"),
            ("Overspeeding", "Ring Road, Lalitpur", Decimal("1000.00"), "unpaid"),
            ("No parking zone", "Durbarmarg, Kathmandu", Decimal("700.00"), "paid"),
            ("Signal violation", "Kalimati, Kathmandu", Decimal("1000.00"), "unpaid"),
            ("No license carried", "Koteshwor, Kathmandu", Decimal("1500.00"), "paid"),
        ]
        for i, (violation, location, amount, status_) in enumerate(fines_data):
            u = users[i % len(users)]
            Fine.objects.get_or_create(
                reference=f"FINE-2026-{3000 + i}",
                defaults={
                    "user": u,
                    "violation": violation,
                    "location": location,
                    "violation_date": date.today() - timedelta(days=5 + i * 3),
                    "amount": amount,
                    "status": status_,
                    "receipt_no": f"R-{5000 + i}" if status_ == "paid" else None,
                },
            )

        # --- Polls ---
        poll, _ = Poll.objects.get_or_create(
            question="What service should be improved next?",
            defaults={
                "description": "Help the municipality prioritise digital service improvements.",
                "is_active": True,
                "created_by": admin,
            },
        )
        poll_options = ["Road repair", "Waste collection", "Online payments", "Drinking water"]
        for text in poll_options:
            PollOption.objects.get_or_create(poll=poll, text=text)
        # a couple of votes
        for u, opt in zip(users[:3], list(poll.options.all())[:3]):
            PollVote.objects.get_or_create(poll=poll, user=u, defaults={"option": opt})
        for opt in poll.options.all():
            opt.votes_count = PollVote.objects.filter(option=opt).count()
            opt.save(update_fields=["votes_count"])

        # --- Issues ---
        issues_data = [
            ("road", "Pothole near Baneshwor", "Large pothole causing traffic jams near Baneshwor chowk.", "Baneshwor, Kathmandu", "reported"),
            ("waste", "Garbage not collected", "Garbage piling up for a week in our street.", "Kirtipur, Kathmandu", "under_review"),
            ("electricity", "Street light not working", "Street lights off for 5 days on this road.", "Pulchowk, Lalitpur", "in_progress"),
            ("water", "Water leakage", "Drinking water pipe leaking near the temple.", "Bhaktapur Durbar", "resolved"),
        ]
        for i, (cat, title, desc, loc, st) in enumerate(issues_data):
            CommunityIssue.objects.get_or_create(
                title=title,
                defaults={
                    "user": users[i % len(users)],
                    "category": cat,
                    "description": desc,
                    "location": loc,
                    "status": st,
                    "upvotes": random.randint(2, 25),
                },
            )

        # --- Notifications ---
        for u in users:
            Notification.objects.get_or_create(
                user=u,
                title="Welcome to Community Services Portal",
                defaults={
                    "message": f"Namaste {u.first_name}! Your account is ready.",
                    "type": "info",
                    "link": "/dashboard",
                },
            )
        self.stdout.write(self.style.SUCCESS("Seed complete."))
