from django.urls import path
from assignments import views


urlpatterns = [
    path('assignments/', views.AssignmentList.as_view()),
   
    
]