from django.urls import path
from lessons import views

urlpatterns = [
    path('lessons/', views.LessonsList.as_view()),
    path('lessons/<int:pk>/', views.LessonsDetail.as_view()),
]