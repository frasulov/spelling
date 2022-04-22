from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
# Create your views here.
from program.serializer import SpellCheckInputSerializer


class IndexView(TemplateView):
    template_name = "program/index.html"


class SpellCheckView(APIView):

    def post(self, request):
        serializer = SpellCheckInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ## process your data here
        return Response(serializer.generate_output(serializer.validated_data["text"]), status=status.HTTP_200_OK)