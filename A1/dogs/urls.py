"""dogs URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView
from dogs.views import DogsViews, ToysViews, OwnersViews, DogOwnersViews

urlpatterns = [
    path('admin/', admin.site.urls),
    path('dogs/',DogsViews.DogsList.as_view()),
    path('dogs/<int:id>',DogsViews.DogsDetails.as_view()),
    path('toys/', ToysViews.ToysList.as_view()),
    path('toys/<int:id>', ToysViews.ToysDetails.as_view()),
    path('owners/', OwnersViews.OwnersList.as_view()),
    path('owners/<int:id>', OwnersViews.OwnersDetails.as_view()),
    path('dogowners/', DogOwnersViews.DogOwnersList.as_view()),
    path('dogs/<int:dog_id>/owners',DogsViews.BulkAddOwnerstoDog.as_view()),
    path('dogowners/<int:id_dog>/<int:id_owner>', DogOwnersViews.DogOwnersDetails.as_view()),
    path('dogs/avg-by-toy-price', DogsViews.DogsOrderedByToyPrice.as_view()),
    path('dogs/nr-of-owners', DogsViews.DogsOrderedByToysPossessed.as_view()),
    path('api/schema/', SpectacularAPIView.as_view(),name="schema"),
    path('api/schema/docs/',SpectacularSwaggerView.as_view(url_name="schema")),
]



