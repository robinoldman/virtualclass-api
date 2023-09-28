from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework import generics, permissions, filters
from .serializers import LessonsSerializer
from django.db.models import Count
from virtualclas.permissions import IsOwnerOrReadOnly
from .models import Lessons
# Create your views here.

class LessonList(generics.ListCreateAPIView):
    """
    List and create lessons.
    """
    queryset = Lessons.objects.all()
    serializer_class = LessonsSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Lessons.objects.annotate(
    # Annotate the queryset, you can add annotations here if needed
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
    ]
    search_fields = [
        'owner__username',
        'title',
        'course',
        'difficulty_level',

    ]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


    def get_serializer_context(self):
        # Pass the request object to the serializer context
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class LessonsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieves a post and edit or delete it if you own it.
    """
    serializer_class = LessonsSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        """
        Gets the queryset of lessons for the detail view.
        """
        return Lessons.objects.all()