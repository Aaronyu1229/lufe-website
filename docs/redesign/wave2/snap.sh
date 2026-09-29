#!/bin/bash
# usage: snap.sh <port> <outdir>  — fetch every route's SSR HTML
PORT=$1; OUT=$2; mkdir -p $OUT
for r in / /services /services/methodology /services/optimize /services/market-assessment /services/product-testing /services/channel-entry /services/localization /cases /cases/bubble-tea /cases/costco-health /cases/electronics-tariff /cases/shoe-brand /insights /field-notes /about /contact /assess /resources /resources/subsidies; do
  f=$(echo "$r" | sed 's#^/$#home#; s#^/##; s#/#_#g'); curl -s "localhost:$PORT$r" > $OUT/$f.html
done
# one article
a=$(grep -oE 'href="/insights/[a-z0-9-]+"' $OUT/insights.html | head -1 | cut -d'"' -f2); curl -s "localhost:$PORT$a" > $OUT/article.html; echo "$a" > $OUT/article.path
ls $OUT | wc -l
