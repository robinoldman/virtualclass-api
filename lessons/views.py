from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, permissions, filters
from .serializers import LessonsSerializer
from django.db.models import Count
from virtualclas.permissions import IsOwnerOrReadOnly
from .models import Lessons
# Create your views here.

class LessonsList (APIView):
    def get(self,request):
        lessons = Lessons.objects.all()
        serializer = LessonsSerializer(lessons, many=True)
        return Response(serializer.data)

class LessonsDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve a post and edit or delete it if you own it.
    """
    serializer_class = LessonsSerializer
    permission_classes = [IsOwnerOrReadOnly]
   
