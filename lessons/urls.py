from django.urls import path
from lessons import views

urlpatterns = [
    path('lessons/', views.LessonList.as_view()),
    path('lessons/<int:pk>/', views.LessonsDetail.as_view()),
]