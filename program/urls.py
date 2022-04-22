from django.urls import path
from .views import *

urlpatterns = [
    path("", IndexView.as_view(), name="index"),
    path("api/v1/spellcheck", SpellCheckView.as_view(), name="spellcheck")
]