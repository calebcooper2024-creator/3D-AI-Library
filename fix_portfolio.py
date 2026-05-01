import re

with open(r"C:\Users\Caleb\Downloads\calebs-3d-case-study\src\data\portfolio.tsx", "r", encoding="utf-8") as f:
    content = f.read()

mapping = {
    'cellcore': ('CellCore', 'cellcoreSections'),
    'maybe-mortgage': ('Maybe Mortgage', 'maybeMortgageSections'),
    'nextera': ('Next Era', 'nextEraSections'),
    'light-wonder': ('Light & Wonder', 'lightWonderSections'),
    'jm-family': ('JM Family', 'jmFamilySections'),
    'nvidia': ('Nvidia', 'nvidiaSections'),
    'flow': ('Flow', 'flowSections'),
    'global-management': ('Consulting Co.', 'globalManagementSections'),
    'fintech-aws': ('Fintech', 'fintechAwsSections'),
    'gwn': ('GWN', 'gwnSections'),
    'hello-patient': ('Hello Patient', 'helloPatientSections'),
    'milestone': ('Milestone', 'milestoneSections')
}

for book_id, (h1_title, var) in mapping.items():
    # Find exact string for replacement
    # The current code looks like:
    #     sections: [
    #       { id: 's1', bgColorLeft: 'bg-black', textColorLeft: 'text-white', bgColorRight: 'bg-transparent', textColorRight: 'text-black', leftContent: <h1>{h1_title}</h1>, rightContent: <p>Details</p> }
    #     ]
    
    target = f"sections: [\n      {{ id: 's1', bgColorLeft: 'bg-black', textColorLeft: 'text-white', bgColorRight: 'bg-transparent', textColorRight: 'text-black', leftContent: <h1>{h1_title}</h1>, rightContent: <p>Details</p> }}\n    ]"
    
    if target in content:
        content = content.replace(target, f"sections: {var}")
        print(f"Replaced {book_id}")
    else:
        print(f"Failed to find {book_id}")

with open(r"C:\Users\Caleb\Downloads\calebs-3d-case-study\src\data\portfolio.tsx", "w", encoding="utf-8") as f:
    f.write(content)
