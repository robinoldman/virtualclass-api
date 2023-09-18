from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import generics, permissions, filters
from .serializers import LessonsSerializer
from django.db.models import Count
from virtualclas.permissions import IsOwnerOrReadOnly
from .models import Lessons
# Create your views here.

class LessonList(ListAPIView):
    queryset = Lessons.objects.all()
    serializer_class = LessonsSerializer

    def get_serializer_context(self):
        # Pass the request object to the serializer context
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class LessonsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = LessonsSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Get the queryset of lessons for the detail view.
        """
        return Lessons.objects.all()