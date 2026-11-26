# -*- coding: utf-8 -*-
# يطبّق هوية v3 على الصفحات الداخلية: الخطوط، والعلامة، ولون الشريط.
# البنية لا تتغيّر — الأصناف نفسها، وملفّ site.css هو الذي صار جديداً.
import io, os, glob

BASE = 'C:/Work Files/Ai Projects/app.spidersbot.com/spidersbot-site'
FILES = ['about.html','contact.html','privacy.html','terms.html','returns.html']
FILES += ['en/'+f for f in FILES]

FONT_NEW = ('<link href="https://fonts.googleapis.com/css2?'
            'family=Sora:wght@300;400;500;600;700'
            '&family=Readex+Pro:wght@300;400;500;600;700'
            '&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">')
FONT_AR = ('<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:'
           'wght@300;400;500;600;700&display=swap" rel="stylesheet">')
FONT_EN = ('<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:'
           'wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">')

MARK = ('<svg class="sp" viewBox="0 0 64 64" width="34" height="34" aria-hidden="true">'
        '<path d="M44 12H26a10 10 0 0 0 0 20h12a10 10 0 0 1 0 20H20" fill="none" stroke="currentColor"'
        ' stroke-width="7" stroke-linecap="round" stroke-linejoin="round"></path>'
        '<circle cx="44" cy="12" r="5.5" fill="currentColor"></circle>'
        '<circle cx="20" cy="52" r="5.5" fill="currentColor"></circle>'
        '<circle cx="32" cy="32" r="6.5" fill="#22CCEE" stroke="#060E26" stroke-width="3"></circle></svg>'
        '<span dir="ltr">Spiders<span class="wm-light"> Bot</span></span>')

def logo(src, alt, word):
    return ('<img class="sp" width="40" height="40" src="%s" alt="%s"> %s' % (src, alt, word))

LOGOS = []
for pre in ('assets', '../assets'):
    for png in ('spidersbot-logo.png', 'spidersbot-logo-white.png'):
        LOGOS.append(logo(pre+'/'+png, 'شعار سبايدرز بوت', 'سبايدرز بوت'))
        LOGOS.append(logo(pre+'/'+png, 'Spiders Bot logo', 'Spiders Bot'))

total = {'font': 0, 'mark': 0}
for rel in FILES:
    p = os.path.join(BASE, rel)
    s = io.open(p, encoding='utf-8').read()
    orig = s

    n = s.count(FONT_AR) + s.count(FONT_EN)
    assert n == 1, (rel, 'font link count', n)
    s = s.replace(FONT_AR, FONT_NEW).replace(FONT_EN, FONT_NEW)
    total['font'] += 1

    marks = 0
    for L in LOGOS:
        c = s.count(L)
        if c:
            s = s.replace(L, MARK)
            marks += c
    assert marks == 2, (rel, 'logo count', marks)
    total['mark'] += marks

    # شريط المتصفّح يتبع الكحليّ الجديد
    s = s.replace('<meta name="theme-color" content="#4F46E5">',
                  '<meta name="theme-color" content="#060E26">')

    assert s != orig
    io.open(p, 'w', encoding='utf-8', newline='\n').write(s)
    print('ok', rel)

print(total)
