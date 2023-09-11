from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

import requests

# Create your views here.
@api_view(['GET'])
def get_team_roster(response, team_id):
    # We only get the active roster for the team
    base_url = "https://statsapi.mlb.com/api/v1/teams/{}/roster/Active?hydrate=person(stats(type=season))".format(team_id)
    response = requests.get(base_url)

    roster = response.json().get('roster')

    format_hitters, format_pitchers = [], []

    for player in roster:
        player_info = player.get('person')

        # player info
        player_id = player_info.get('id')
        first_last_name = player_info.get('firstLastName')
        last_first_name = player_info.get('lastFirstName')
        age = player_info.get('currentAge')
        bat_side = player_info.get('batSide').get('code')
        throw_side = player_info.get('pitchHand').get('code')
        jersey_number = player.get('jerseyNumber')
        position = player.get('position').get('abbreviation')
        weight = player_info.get('weight')
        height = player_info.get('height')
        draft_year = player_info.get('draftYear', '-')


        player_img = "https://content.mlb.com/images/headshots/current/60x60/{}.png".format(player_id)

        player_curr_season_stats = player_info.get('stats')[0].get('splits')[0].get('stat')


        format_player = {
            "id": player_id,
            "firstLastName": first_last_name,
            "lastFirstName": last_first_name,
            "position": position,
            "jerseyNumber": jersey_number,
            "age": age,
            "batSide": bat_side,
            "throwSide": throw_side,
            "img": player_img,
            "weight": weight,
            "height": height,
            "draftedYear": draft_year
        } 

        if position == 'P' or position == 'TWP':
            innings_pitched = player_curr_season_stats.get('inningsPitched')
            era = player_curr_season_stats.get('era')
            strike_outs = player_curr_season_stats.get('strikeOuts')
            base_on_balls = player_curr_season_stats.get('baseOnBalls')
            batters_faced = player_curr_season_stats.get('battersFaced')
            strike_outs_perct = round(strike_outs / batters_faced * 100, 2)
            base_on_balls_perct = round(base_on_balls / batters_faced * 100, 2)
            homeruns_per_nine = player_curr_season_stats.get('homeRunsPer9')
            on_base_plus_slugging = player_curr_season_stats.get('ops')
            
            
            format_player.update({
                'inningsPitched': innings_pitched,
                'era': era,
                'strikeOuts': strike_outs,
                'walk': base_on_balls,
                'strikeOutPerct': strike_outs_perct,
                'walkPerct': base_on_balls_perct,
                'homerunsPerNine': homeruns_per_nine,
                'onBasePlusSlugging': on_base_plus_slugging
            })

            format_pitchers.append(format_player)
            
        else:
            # player stats
            pa = player_curr_season_stats.get('plateAppearances')
            hits = player_curr_season_stats.get('hits')
            doubles = player_curr_season_stats.get('doubles')
            triples = player_curr_season_stats.get('triples')
            homeruns = player_curr_season_stats.get('homeRuns')
            stolen_bases = player_curr_season_stats.get('stolenBases')
            strike_outs_perct = round(player_curr_season_stats.get('strikeOuts') / pa * 100, 2)
            base_on_balls_perct = round(player_curr_season_stats.get('baseOnBalls') / pa * 100, 2)
            batting_avg = player_curr_season_stats.get('avg')
            on_base_perct = player_curr_season_stats.get('obp')
            on_base_plus_slugging = player_curr_season_stats.get('ops')

            format_player.update({
                "plateAppearance": pa,
                "hits": hits,
                "doubles": doubles,
                "triples": triples,
                "homeRuns": homeruns,
                "stolenBases": stolen_bases,
                "strikeOutPerct": strike_outs_perct,
                "walkPerct": base_on_balls_perct,
                "battingAvg": batting_avg,
                "onBasePerct": on_base_perct,
                "onBasePlusSlugging": on_base_plus_slugging
            })

            format_hitters.append(format_player)

    format_response = {"hitters": format_hitters, "pitchers": format_pitchers}

    return Response(format_response)


        