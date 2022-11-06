from django.urls import path
from . import views

#Create your URL here

urlpatterns = [
    path('', views.home, name='home'),
]