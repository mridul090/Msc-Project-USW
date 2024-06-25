from django.contrib import admin
from BackendAPIs.BackendModels.blog_model import BlogPost, Tag, Category
from BackendAPIs.BackendModels.contractus_model import ContractUs
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.utils.html import format_html

# Register your models here.

class AdminOverviewOnPost(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at', 'category')
    # list_filter = ()

# class AdminOverviewOnContractUs(admin.ModelAdmin):
#     list_display = ('name', 'email', 'subject', 'created_at', 'replied_at', 'reply_action')
#     fields = ('name', 'email', 'subject', 'message', 'admin_reply', 'created_at', 'replied_at')
#     readonly_fields = ('name', 'email', 'subject', 'message', 'created_at', 'replied_at')
#     actions = ['send_reply']
#
#     def send_reply(self, request, queryset):
#         for contact in queryset:
#
#             if contact.admin_reply:
#                 send_mail(
#                     f"Reply to: {contact.subject}",
#                     contact.admin_reply,
#                     settings.DEFAULT_FROM_EMAIL,
#                     [contact.email],
#                     fail_silently=False,
#                 )
#                 contact.replied_at = timezone.now()
#                 contact.save()
#                 self.message_user(request, f"Reply sent to {contact.email}")
#
#
#     send_reply.short_description = "Send reply to selected messages"
#
#     def reply_action(self, obj):
#         if obj.admin_reply:
#             return format_html('<span style="color:green;">Replied</span>')
#         return format_html('<span style="color:red;">Pending</span>')
#
#     reply_action.short_description = "Reply Status"

class AdminOverviewOnContractUs(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'replied_at', 'reply_action')
    fields = ('name', 'email', 'subject', 'message', 'admin_reply', 'created_at', 'replied_at')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at', 'replied_at')
    actions = ['send_reply']

    def send_reply(self, request, queryset):
        for contact in queryset:
            print(f"admin reply {contact.admin_reply} to the email {contact.email} from {settings.DEFAULT_FROM_EMAIL}")
            if contact.admin_reply:
                try:
                    send_mail(
                        f"Reply to: {contact.subject}",
                        contact.admin_reply,
                        settings.DEFAULT_FROM_EMAIL,
                        [contact.email],
                        fail_silently=False,
                    )
                    contact.replied_at = timezone.now()
                    contact.save()
                    self.message_user(request, f"Reply sent to {contact.email}")
                    print("success")
                except Exception as e:
                    self.message_user(request, f"Failed to send email to {contact.email}: {e}", level='error')
                    print("failed")
    send_reply.short_description = "Send reply to selected messages"

    def reply_action(self, obj):
        if obj.admin_reply:
            return format_html('<span style="color:green;">Replied</span>')
        return format_html('<span style="color:red;">Pending</span>')

    reply_action.short_description = "Reply Status"

admin.site.register(BlogPost, AdminOverviewOnPost)
admin.site.register(ContractUs, AdminOverviewOnContractUs)
admin.site.register(Tag)
admin.site.register(Category)
