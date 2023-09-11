from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import requests

# Create your views here.

@api_view(['GET'])
def get_leaderboard(request, type):

    if type != 'pitching' and type != 'hitting':
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if type == 'pitching':
        mapping = {
            'earnedRunAverage': 'era',
            'walksAndHitsPerInningPitched': 'whip',
            'strikeouts': 'strikeOuts'
        }

    elif type == 'hitting':
        mapping = {
            'homeRuns': 'homeRuns',
            'runsBattedIn': 'rbi',
            'battingAverage': 'avg'
        }

    query_param = ','.join(list(mapping.values()))
    return Response(_get_leaderboard(query_param, type, mapping))


def _get_leaderboard(query, group_type, mapping):
    url = 'https://statsapi.mlb.com/api/v1/stats/leaders?leaderCategories={}&statGroup={}'.format(query, group_type)
    
    response = requests.get(url)
    response_json = response.json()

    leaderboard = {}

    for leader_category in response_json.get('leagueLeaders'):
        category_name = mapping.get(leader_category.get('leaderCategory'))

        leaderboard.setdefault(category_name, [])

        for leader in leader_category.get('leaders'):
            rank = leader.get('rank')
            value = leader.get('value')

            team = leader.get('team')
            team_id = team.get('id')
            team_name = team.get('name')

            player = leader.get('person')
            player_id = player.get('id')
            player_name = player.get('fullName')

            leaderboard.get(category_name).append(
                {
                    'rank': rank,
                    'value': value,
                    'teamID': team_id,
                    'teamName': team_name,
                    'id': player_id,
                    'name': player_name
                }
            )


    return leaderboard


