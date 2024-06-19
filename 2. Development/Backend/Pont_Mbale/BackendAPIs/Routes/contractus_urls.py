from django.urls import path
from BackendAPIs.Views.contractus_views import create_contract_us, contact_us_list, reply_to_message


urlpatterns = [
    path('contractus/create/', create_contract_us, name= 'create_contract_us'),
    path('admin/messages/', contact_us_list, name='contact-us-list'),
    path('admin/messages/<int:pk>/reply/', reply_to_message, name='reply-to-message'),
]