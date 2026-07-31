# spidersbot-site — الموقع التسويقي (spidersbot.com)

موقع ثابت (HTML/CSS/JS) يُنشر إلى جذر النطاق الرئيسي `public_html/`.
مستقل تماماً عن تطبيق `app.spidersbot.com` (مستودع منفصل).

## النشر (cPanel Git Version Control)
1. Clone هذا المستودع في السيرفر على المسار: `/home/frd3ysh3yl6f/spidersbot-site`
2. cPanel → Git Version Control → Manage → **Update from Remote** ثم **Deploy HEAD Commit**
3. `.cpanel.yml` يعمل rsync إلى `public_html/` **بدون --delete** (لا يمسّ مجلد app.spidersbot.com/ ولا يحذف شيئاً).

## المحتوى
- `index.html` — الصفحة الرئيسية
- `privacy.html` / `terms.html` / `returns.html` — الصفحات القانونية
- `about.html` / `contact.html` — صفحات داخلية
- `assets/` — الشعار + الصور + `site.css`
- `sitemap.xml` / `robots.txt` / `.htaccess`
