from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)

WIDTH, HEIGHT = A4
INK = HexColor("#171915")
PAPER = HexColor("#F4F0E7")
MUTED = HexColor("#686B63")
ACID = HexColor("#D7FF5F")
ORANGE = HexColor("#FF6937")
LINE = HexColor("#D7D1C5")
WHITE = HexColor("#FFFFFF")

pdfmetrics.registerFont(TTFont("KabaSans", "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("KabaSans-Bold", "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"))


BRIEFS = [
    {
        "filename": "kaba-labs-creator-brief.pdf",
        "brand": "KABA LABS",
        "campaign": "Show what real business growth support looks like",
        "category": "MARKETING",
        "rate": "200 ETB / 1,000 qualified views",
        "cap": "10,000 ETB maximum per approved video",
        "objective": "Help Ethiopian business owners understand that Kaba Labs is an accountable growth partner, not only a content-production agency.",
        "audience": "Ethiopian founders, business owners, and managers who need stronger marketing and sales systems.",
        "message": "Kaba Labs diagnoses the real bottleneck, prioritizes the right work, and stays accountable for execution.",
        "angles": [
            "Explain why more content does not always fix a business.",
            "Show the difference between buying deliverables and hiring a growth partner.",
            "Break down one common business-growth bottleneck.",
        ],
        "hooks": [
            "Eight videos cannot fix the wrong business problem.",
            "Your ads may not be the real reason sales are slow.",
            "This is what a real outsourced growth team should do.",
        ],
        "must": [
            "Say Kaba Labs clearly and show the approved logo or website.",
            "Explain diagnosis before deliverables.",
            "Use original examples and your own presentation style.",
            "Submit the idea or draft for approval before publishing.",
        ],
        "avoid": [
            "Guaranteed revenue, follower, or sales claims.",
            "Invented client results or testimonials.",
            "Purchased views, engagement groups, copied scripts, or paid boosting.",
            "Presenting Kaba Labs as only a video-production service.",
        ],
    },
    {
        "filename": "kaba-bounty-creator-brief.pdf",
        "brand": "KABA BOUNTY",
        "campaign": "Explain how creators can earn from their views",
        "category": "CREATOR ECONOMY",
        "rate": "175 ETB / 1,000 qualified views",
        "cap": "7,500 ETB maximum per approved video",
        "objective": "Help early creators understand how Kaba Bounty pays for qualified organic views and how to apply for a campaign.",
        "audience": "Ethiopian TikTok and Instagram creators, especially smaller creators building their first portfolio.",
        "message": "Choose a bounty, follow the brief, publish approved original content, and earn based on qualified views.",
        "angles": [
            "Walk through the three-step creator process.",
            "Calculate what 10,000 or 50,000 qualified views could earn.",
            "Explain why creators do not need a huge following to start.",
        ],
        "hooks": [
            "You do not need a brand deal to start earning from content.",
            "What if 10,000 views could pay you?",
            "Small Ethiopian creators should know about this.",
        ],
        "must": [
            "Show the Kaba Bounty website and the campaign selection process.",
            "Explain that content requires approval before publishing.",
            "Mention that only qualified organic views are paid.",
            "State that each campaign has a rate, cap, slots, and earning window.",
        ],
        "avoid": [
            "Promising every applicant will be accepted.",
            "Promising unlimited or automatic payouts.",
            "Fake views, engagement groups, misleading earnings claims, or paid boosting.",
            "Calling Kaba Bounty employment or guaranteed income.",
        ],
    },
]


def wrap(text, font, size, max_width):
    words = str(text).split()
    lines = []
    current = ""
    for word in words:
        candidate = f"{current} {word}".strip()
        if current and stringWidth(candidate, font, size) > max_width:
            lines.append(current)
            current = word
        else:
            current = candidate
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, max_width, font="KabaSans", size=10, leading=14, color=INK):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in wrap(text, font, size, max_width):
        c.drawString(x, y, line)
        y -= leading
    return y


def header(c, brief, page_number):
    c.setFillColor(PAPER)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("KabaSans-Bold", 11)
    c.drawString(48, HEIGHT - 42, "KABA LABS")
    c.setFillColor(ORANGE)
    c.setFont("KabaSans-Bold", 7)
    c.drawString(WIDTH - 175, HEIGHT - 40, f"{brief['brand']} - CREATOR BRIEF")
    c.setStrokeColor(LINE)
    c.line(48, HEIGHT - 55, WIDTH - 48, HEIGHT - 55)
    c.setFillColor(MUTED)
    c.setFont("KabaSans", 7)
    c.drawString(48, 28, "Kaba Labs funded creator pilot - Internal campaign instruction")
    c.drawRightString(WIDTH - 48, 28, f"0{page_number} / 03")


def section_label(c, number, label, y):
    c.setFillColor(ORANGE)
    c.setFont("KabaSans-Bold", 7)
    c.drawString(48, y, f"{number}  {label.upper()}")
    return y - 20


def draw_bullets(c, items, x, y, max_width, color=MUTED):
    for item in items:
        c.setFillColor(ORANGE)
        c.circle(x + 3, y + 3, 2, fill=1, stroke=0)
        y = draw_wrapped(c, item, x + 14, y, max_width - 14, size=9, leading=13, color=color) - 8
    return y


def draw_cover(c, brief):
    c.setFillColor(INK)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    c.setFillColor(ACID)
    c.rect(0, HEIGHT - 9, WIDTH, 9, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("KabaSans-Bold", 13)
    c.drawString(48, HEIGHT - 62, "KABA LABS")
    c.setFillColor(HexColor("#90958B"))
    c.setFont("KabaSans-Bold", 7)
    c.drawRightString(WIDTH - 48, HEIGHT - 59, "KABA BOUNTY / PILOT 2026")

    c.setFillColor(ORANGE)
    c.setFont("KabaSans-Bold", 8)
    c.drawString(48, HEIGHT - 150, brief["category"])
    c.setFillColor(WHITE)
    c.setFont("KabaSans-Bold", 30)
    y = HEIGHT - 192
    for line in wrap(brief["campaign"], "KabaSans-Bold", 30, WIDTH - 96):
        c.drawString(48, y, line)
        y -= 34

    y -= 16
    c.setStrokeColor(HexColor("#3C4038"))
    c.line(48, y, WIDTH - 48, y)
    y -= 42
    c.setFillColor(HexColor("#969B91"))
    c.setFont("KabaSans", 8)
    c.drawString(48, y, "BRAND")
    c.drawString(290, y, "CREATOR RATE")
    y -= 18
    c.setFillColor(WHITE)
    c.setFont("KabaSans-Bold", 14)
    c.drawString(48, y, brief["brand"])
    c.drawString(290, y, brief["rate"])
    y -= 52
    c.setFillColor(HexColor("#969B91"))
    c.setFont("KabaSans", 8)
    c.drawString(48, y, "MAXIMUM REWARD")
    y -= 18
    c.setFillColor(ACID)
    c.setFont("KabaSans-Bold", 14)
    c.drawString(48, y, brief["cap"])

    c.setFillColor(HexColor("#252821"))
    c.roundRect(48, 78, WIDTH - 96, 95, 5, fill=1, stroke=0)
    c.setFillColor(ACID)
    c.setFont("KabaSans-Bold", 8)
    c.drawString(66, 145, "THE RULE")
    c.setFillColor(WHITE)
    c.setFont("KabaSans-Bold", 16)
    c.drawString(66, 118, "Original content. Organic views. Approval first.")
    c.setFillColor(HexColor("#9CA097"))
    c.setFont("KabaSans", 8)
    c.drawString(66, 96, "Read every page before applying or producing the video.")

    c.setFillColor(HexColor("#7C8177"))
    c.setFont("KabaSans", 7)
    c.drawRightString(WIDTH - 48, 32, "01 / 03")
    c.showPage()


def draw_direction(c, brief):
    header(c, brief, 2)
    y = HEIGHT - 90
    y = section_label(c, "01", "Campaign direction", y)
    c.setFont("KabaSans-Bold", 24)
    c.setFillColor(INK)
    c.drawString(48, y, "What this content should achieve")
    y -= 34
    y = draw_wrapped(c, brief["objective"], 48, y, WIDTH - 96, size=10, leading=15, color=MUTED)

    y -= 20
    c.setFillColor(ACID)
    c.roundRect(48, y - 80, WIDTH - 96, 92, 4, fill=1, stroke=0)
    c.setFillColor(HexColor("#535A3E"))
    c.setFont("KabaSans-Bold", 7)
    c.drawString(64, y - 8, "CORE MESSAGE")
    draw_wrapped(c, brief["message"], 64, y - 31, WIDTH - 128, font="KabaSans-Bold", size=12, leading=16, color=INK)
    y -= 112

    c.setFillColor(MUTED)
    c.setFont("KabaSans-Bold", 7)
    c.drawString(48, y, "TARGET AUDIENCE")
    y -= 18
    y = draw_wrapped(c, brief["audience"], 48, y, WIDTH - 96, size=9, leading=14, color=MUTED)

    y -= 24
    c.setStrokeColor(LINE)
    c.line(48, y, WIDTH - 48, y)
    y -= 30
    y = section_label(c, "02", "Creative direction", y)
    c.setFont("KabaSans-Bold", 20)
    c.setFillColor(INK)
    c.drawString(48, y, "Choose an angle, then make it yours")
    y -= 33
    col_width = (WIDTH - 112) / 2
    c.setFillColor(WHITE)
    c.roundRect(48, 94, col_width, y - 78, 4, fill=1, stroke=0)
    c.roundRect(64 + col_width, 94, col_width, y - 78, 4, fill=1, stroke=0)
    c.setFillColor(ORANGE)
    c.setFont("KabaSans-Bold", 8)
    c.drawString(62, y - 18, "CONTENT ANGLES")
    c.drawString(78 + col_width, y - 18, "HOOK STARTERS")
    draw_bullets(c, brief["angles"], 62, y - 45, col_width - 25)
    draw_bullets(c, brief["hooks"], 78 + col_width, y - 45, col_width - 25)
    c.showPage()


def draw_rules(c, brief):
    header(c, brief, 3)
    y = HEIGHT - 90
    y = section_label(c, "03", "Approval rules", y)
    c.setFont("KabaSans-Bold", 24)
    c.setFillColor(INK)
    c.drawString(48, y, "What gets approved and paid")
    y -= 35

    col_width = (WIDTH - 112) / 2
    c.setFillColor(HexColor("#EBF8D1"))
    c.roundRect(48, y - 270, col_width, 282, 4, fill=1, stroke=0)
    c.setFillColor(HexColor("#FFE8DF"))
    c.roundRect(64 + col_width, y - 270, col_width, 282, 4, fill=1, stroke=0)
    c.setFillColor(HexColor("#3F5B18"))
    c.setFont("KabaSans-Bold", 9)
    c.drawString(63, y - 18, "MUST INCLUDE")
    c.setFillColor(HexColor("#8A3216"))
    c.drawString(79 + col_width, y - 18, "DO NOT DO")
    draw_bullets(c, brief["must"], 63, y - 50, col_width - 28, color=INK)
    draw_bullets(c, brief["avoid"], 79 + col_width, y - 50, col_width - 28, color=INK)

    y -= 305
    y = section_label(c, "04", "Submission and payout", y)
    c.setFont("KabaSans-Bold", 19)
    c.setFillColor(INK)
    c.drawString(48, y, "Apply - approve - draft - publish - verify - pay")
    y -= 29
    steps = [
        ("1", "Apply", "Submit your profile and choose this bounty."),
        ("2", "Approval", "Kaba Labs confirms the slot and final CTA."),
        ("3", "Publish", "Post only after the idea or draft is approved."),
        ("4", "Payout", "Qualified organic views are counted for 14 days and paid after verification."),
    ]
    for number, title, copy in steps:
        c.setFillColor(INK)
        c.circle(58, y + 2, 10, fill=1, stroke=0)
        c.setFillColor(ACID)
        c.setFont("KabaSans-Bold", 7)
        c.drawCentredString(58, y, number)
        c.setFillColor(INK)
        c.setFont("KabaSans-Bold", 9)
        c.drawString(78, y + 1, title)
        y = draw_wrapped(c, copy, 145, y + 1, WIDTH - 193, size=8, leading=11, color=MUTED) - 14

    c.setFillColor(INK)
    c.roundRect(48, 54, WIDTH - 96, 48, 4, fill=1, stroke=0)
    c.setFillColor(ACID)
    c.setFont("KabaSans-Bold", 8)
    c.drawString(62, 81, "PAYOUT STANDARD")
    c.setFillColor(WHITE)
    c.setFont("KabaSans", 8)
    c.drawString(62, 66, "Organic qualified views only. Fraudulent traffic voids the reward.")
    c.showPage()


def create_brief(brief):
    output = OUT / brief["filename"]
    c = canvas.Canvas(str(output), pagesize=A4)
    c.setTitle(f"{brief['brand']} Creator Brief")
    c.setAuthor("Kaba Labs")
    c.setSubject("Kaba Bounty creator campaign instructions")
    draw_cover(c, brief)
    draw_direction(c, brief)
    draw_rules(c, brief)
    c.save()
    return output


if __name__ == "__main__":
    for item in BRIEFS:
        print(create_brief(item))
