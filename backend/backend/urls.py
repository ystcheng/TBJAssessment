"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
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
from home import views
from news import views as news_views
from team import views as team_views
from player import views as player_views
from leaderboard import views as leaderboard_views

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/division/([a-zA-Z]+)$', views.division_detail),
    re_path(r'^api/news/$', news_views.get_latest_news),
    re_path(r'^api/team/roster/([0-9]+)$', team_views.get_team_roster),
    re_path(r'^api/player/([0-9]+)/([a-zA-z]+)$', player_views.get_player_info),
    re_path(r'^api/leaderboard/([a-zA-Z]+)$', leaderboard_views.get_leaderboard)
]
