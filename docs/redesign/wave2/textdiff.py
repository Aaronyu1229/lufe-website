#!/usr/bin/env python3
"""usage: textdiff.py <baseline_dir> <new_dir> <page>...  — compare visible SSR text (incl. hidden) per page."""
import sys, re
from html.parser import HTMLParser
from collections import Counter
class T(HTMLParser):
    def __init__(s): super().__init__(); s.skip=0; s.out=[]
    def handle_starttag(s,t,a):
        if t in('script','style','noscript','template'): s.skip+=1
        for k,v in a:
            if k in('alt','aria-label','placeholder','title') and v: s.out.append(v)
    def handle_endtag(s,t):
        if t in('script','style','noscript','template'): s.skip-=1
    def handle_data(s,d):
        if not s.skip:
            d=re.sub(r'\s+',' ',d).strip()
            if d: s.out.append(d)
def texts(p):
    t=T(); t.feed(open(p,encoding='utf-8').read()); return t.out
def norm(xs):
    # join then split on sentence-ish boundaries so re-chunked markup still compares
    j=''.join(xs); j=re.sub(r'\s+','',j)
    return j
base,new=sys.argv[1],sys.argv[2]
for page in sys.argv[3:]:
    a=Counter(texts(f'{base}/{page}.html')); b=Counter(texts(f'{new}/{page}.html'))
    miss=[x for x in a if x not in b]; add=[x for x in b if x not in a]
    # tolerate re-chunking: a missing chunk counts as present if it appears inside the joined new text
    jb=norm(b.elements()); ja=norm(a.elements())
    miss=[x for x in miss if re.sub(r'\s+','',x) not in jb]
    add=[x for x in add if re.sub(r'\s+','',x) not in ja]
    print(f'== {page}: missing {len(miss)}, added {len(add)}')
    for x in miss[:40]: print('  - ', x[:120])
    for x in add[:40]: print('  + ', x[:120])
