from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import requests


# Create your views here.

@api_view(['GET'])
def division_detail(request, league):
    # # get american divisions id to name mapping 
    # american_divisions = _get_divisions(103)

    # # get national division id to name mapping
    # national_divisions = _get_divisions(104)

    base_url = "https://statsapi.mlb.com/api/v1/standings?leagueId="

    if league == 'american':
        divisions = _get_divisions(103)
        url = base_url + "103"
    else:
        divisions = _get_divisions(104)
        url = base_url + "104"

    
    response = requests.get(url)
    response_json = response.json()

    format_response = {}

    for record in response_json.get('records'):
        division_id = record.get('division').get('id')

        division_name = divisions.get(division_id)

        format_response.setdefault(division_name, [])

        for team in record.get('teamRecords'):
            team_id = team.get('team').get('id')
            team_basic_info = _get_team(team_id)
            division_rank = team.get('divisionRank')
            wins = team.get('wins')
            losses = team.get('losses')
            diff = team.get('runDifferential')
            winning_perct = team.get('winningPercentage')
            games_behind = team.get('gamesBack')
            last_ten = _get_last_ten(team.get('records').get('splitRecords'))

            format_team_data = {
                'id': team_id,
                'divisionRank': int(division_rank),
                'wins': wins,
                'losses': losses,
                'diff': diff,
                'gb': games_behind,
                'pct': winning_perct,
                'lastTen': last_ten
            } 

            format_team_data.update(team_basic_info)

            format_response.get(division_name).append(format_team_data)



    return Response(format_response)

def _get_last_ten(split_records):
    for record in split_records:
        if record.get('type') == 'lastTen':
            result = "{}-{}".format(record.get('wins'), record.get('losses'))
            return result
        
    return None

def _get_team(team_id):
    response = requests.get("https://statsapi.mlb.com/api/v1/teams/{}".format(team_id))
    response_json = response.json()
    team = response_json.get('teams')[0]

    id = team_id
    team_code = team.get('abbreviation')
    team_name = team.get('name')
    img_url = "https://www.mlbstatic.com/team-logos/{}.svg".format(id)

    format_res = {
        'id': id,
        'name': team_code,
        'fullName': team_name,
        'img': img_url
    }

    return format_res
    

def _get_divisions(league_id):
    response = requests.get("https://statsapi.mlb.com/api/v1/divisions/?leagueId={}".format(league_id))
    res_json = response.json()

    division_mapping = {}

    for obj in res_json.get("divisions"):
        id = obj.get('id')
        name = obj.get('nameShort')

        division_mapping.setdefault(id, name)

    return division_mapping

@api_view(['PUT', 'DELTE', 'POST'])
def home_detail(request, id):

    return Response(status=status.HTTP_204_NO_CONTENT)