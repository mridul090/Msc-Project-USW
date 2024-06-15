from django.contrib import admin
from BackendAPIs.BackendModels.blog_model import BlogPost, Tag, Category
from BackendAPIs.BackendModels.contractus_model import ContractUs
# Register your models here.

class AdminOverviewOnPost(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at', 'category')
    # list_filter = ()

class AdminOverviewOnContractUs(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')

admin.site.register(BlogPost, AdminOverviewOnPost)
admin.site.register(ContractUs, AdminOverviewOnContractUs)
admin.site.register(Tag)
admin.site.register(Category)
