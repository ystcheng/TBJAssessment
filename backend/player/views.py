from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import requests
# Create your views here.
@api_view(['GET'])
def get_player_info(response, player_id, type):


    url = "https://statsapi.mlb.com/api/v1/people/{}?hydrate=stats(group=[{}],type=[yearByYear])".format(player_id, type)
    resp_json = requests.get(url).json()

    player_stats = resp_json.get('people')[0].get('stats')[0]
    player_histories = player_stats.get('splits')
    player_info = []

    if type == 'hitting':
        player_info = _get_player_info_hitter(player_histories)
    elif type == 'pitching':
        player_info = _get_player_info_pitcher(player_histories)

    return Response(player_info)

def _get_player_info_pitcher(player_histories):
    data = []
    
    for history in player_histories:
        stat = history.get('stat')
        year = history.get('season')
        team = history.get('team', {}).get('id')
        
        innings_pitched = stat.get('inningsPitched')
        games_pitched = stat.get('gamesPitched')
        wins = stat.get('wins')
        losses = stat.get('losses')
        saves = stat.get('saves')
        era = stat.get('era')
        whip = stat.get('whip')
        hits = stat.get('hits')
        runs = stat.get('runs')
        strike_outs = stat.get('strikeOuts')
        walks = stat.get('baseOnBalls')
        homeruns_per_nine = stat.get('homeRunsPer9')
        ops = stat.get('ops')

        format_info = {
            'id': int(year),
            'year': int(year),
            'team': team,
            'gamesPitched': games_pitched,
            'inningsPitched': innings_pitched,
            'wins': wins,
            'losses': losses,
            'saves': saves,
            'era': era,
            'whip': whip,
            'hits': hits,
            'runs': runs,
            'strikeOuts': strike_outs,
            'walks': walks,
            'homeRunsPerNine': homeruns_per_nine,
            'ops': ops
        }

        data.append(format_info)

    return data

        

def _get_player_info_hitter(player_histories):
    data = []

    for history in player_histories:
        stat = history.get('stat')

        year = history.get('season')
        team = history.get('team', {}).get('id')
        
        games_played = stat.get('gamesPlayed')
        plate_appearances = stat.get('plateAppearances')
        at_bats = stat.get('atBats')
        runs = stat.get('runs')
        hits = stat.get('hits') 
        doubles = stat.get('doubles')
        triples = stat.get('triples')
        home_runs = stat.get('homeRuns')
        rbi = stat.get('rbi')
        stolen_bases = stat.get('stolenBases')
        walks = stat.get('baseOnBalls')
        strike_outs = stat.get('strikeOuts')
        obp = stat.get('obp')
        slg = stat.get('slg')
        ops = stat.get('ops')

        format_info = {
            'id': int(year),
            'year': int(year),
            'team': team,
            'gamesPlayed': games_played,
            'plateAppearances': plate_appearances,
            'atBats': at_bats,
            'runs': runs,
            'hits': hits,
            'doubles': doubles,
            'triples': triples,
            'homeRuns': home_runs,
            'rbi': rbi,
            'stolenBases': stolen_bases,
            'walks': walks,
            'strikeOuts': strike_outs,
            'obp': obp,
            'slg': slg,
            'ops': ops
        }

        data.append(format_info)

    return data


