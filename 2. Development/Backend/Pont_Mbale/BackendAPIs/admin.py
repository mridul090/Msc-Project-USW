from django.contrib import admin
from BackendAPIs.BackendModels.blog_models import BlogPost, Tag, Category
# Register your models here.

class AdminOverviewOnPost(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at', 'category')
    # list_filter = ()

admin.site.register(BlogPost, AdminOverviewOnPost)
admin.site.register(Tag)
admin.site.register(Category)
