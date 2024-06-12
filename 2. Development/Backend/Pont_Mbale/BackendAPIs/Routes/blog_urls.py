from django.urls import path
from BackendAPIs.Views.blog_views import View_BlogPost, Create_BlogPost, Update_BlogPost, View_tag, Create_tag, View_Category, Create_Category

urlpatterns = [
    path('blog/create/', Create_BlogPost, name= 'Create_BlogPost'),
    path('blog/update/<int:pk>', Update_BlogPost, name= 'Update_BlogPost'),
    path('blog/view/', View_BlogPost, name= 'View_BlogPost'),
    path('tag/create/', Create_tag, name= 'Create_tag'),
    path('tag/view/', View_tag, name= 'View_tag'),
    path('category/create/', Create_Category, name= 'Create_Category'),
    path('category/view/', View_Category, name= 'View_Category'),
]