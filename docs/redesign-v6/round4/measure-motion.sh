#!/usr/bin/env bash
# Usage: measure.sh file.mp4 [...]  -> prints: file fps m rate
# m = median over frames of (YAVG of |frame_n - frame_n-1| at 320x180 gray) * fps
# rate = clamp(round0.05(sqrt(75/m)), 0.6, 1.25)
for f in "$@"; do
  fps=$(ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate -of csv=p=0 "$f")
  tmp=$(mktemp)
  ffmpeg -nostats -v error -i "$f" -vf "scale=320:180,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=$tmp" -f null -
  grep -o 'YAVG=[0-9.]*' "$tmp" | cut -d= -f2 | sort -n | awk -v fps="$fps" -v f="$(basename "$f")" '
    {a[NR]=$1} END{split(fps,p,"/"); r=p[1]/(p[2]?p[2]:1);
      med=(NR%2)?a[(NR+1)/2]:(a[NR/2]+a[NR/2+1])/2; m=med*r;
      rate=sqrt(75/m); rate=int(rate/0.05+0.5)*0.05; if(rate<0.6)rate=0.6; if(rate>1.25)rate=1.25;
      printf "%-34s fps=%6.3f m=%7.1f rate=%.2f\n", f, r, m, rate}'
  rm -f "$tmp"
done
