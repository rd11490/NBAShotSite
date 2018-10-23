#!/bin/bash

. "$(dirname "${BASH_SOURCE[0]}")/commons.sh"

echo $JAR

sh seasonStats.sh --season 2018-19 --run-all
sh playerStats.sh --season 2018-19 --run-all
sh playersOnCourt.sh --season 2018-19 --run-all
sh run.sh com.rrdinsights.russell.etl.application.GameDateMapBuilder
sh run.sh com.rrdinsights.russell.etl.application.PlayerIdMapBuilder
sh run.sh com.rrdinsights.russell.etl.application.TeamIdMapBuilder
sh run.sh com.rrdinsights.russell.investigation.shots.ShotsWithPlayers --season 2018-19
sh run.sh com.rrdinsights.russell.etl.driver.ShotSitePutter --season 2018-19 --run-all

