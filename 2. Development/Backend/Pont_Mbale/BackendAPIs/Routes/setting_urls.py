from django.urls import path
from BackendAPIs.Views.setting_views import upload_view_images, update_delete_images


urlpatterns = [
    path('settings/images/', upload_view_images, name='Upload_View_Images'),
    path('settings/images/<int:pk>/', update_delete_images, name='update_delete_images'),
]