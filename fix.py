import sys

file_path = 'src/components/Navigation.tsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add hovered state
content = content.replace(
    'const [backHovered, setBackHovered] = useState(false);',
    'const [backHovered, setBackHovered] = useState(false);\n  const [hovered, setHovered] = useState(false);'
)

# 2. Add hover trigger and update nav
old_nav_start = """    <>
      {/* ── Fixed Nav Bar — slides in/out ── */}
      <nav
        style={{
          zIndex: 999,
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          transform: navVisible || menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.5s cubic-bezier(.65,0,.35,1)',
        }}
      >"""

new_nav_start = """    <>
      {revealOnHover && !menuOpen && (
        <div
          onMouseEnter={() => setHovered(true)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '4rem',
            zIndex: 998,
          }}
        />
      )}
      {/* ── Fixed Nav Bar — slides in/out ── */}
      <nav
        onMouseEnter={() => revealOnHover && setHovered(true)}
        onMouseLeave={() => revealOnHover && setHovered(false)}
        style={{
          zIndex: 999,
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          transform: revealOnHover
            ? (hovered || menuOpen ? 'translateY(0)' : 'translateY(-100%)')
            : (navVisible || menuOpen ? 'translateY(0)' : 'translateY(-100%)'),
          transition: 'transform 0.5s cubic-bezier(.65,0,.35,1)',
        }}
      >"""

if old_nav_start in content:
    content = content.replace(old_nav_start, new_nav_start)
else:
    # Try with \r\n
    content = content.replace(old_nav_start.replace('\n', '\r\n'), new_nav_start.replace('\n', '\r\n'))

# 3. Hide brand center on mobile
old_brand = """          {/* Center — brand: navigates to brandTab if set, else current tab */}
          <a
            href={brandHref}
            onClick={(e) => { e.preventDefault(); handleNavigate(brandHref, brandTab ?? activeItem); }}
            style={{
              display: 'flex',
              position: 'relative',
              textDecoration: 'none',
              width: 'auto',
            }}
          >"""

new_brand = """          {/* Center — brand: navigates to brandTab if set, else current tab */}
          <a
            href={brandHref}
            className="hidden md:flex"
            onClick={(e) => { e.preventDefault(); handleNavigate(brandHref, brandTab ?? activeItem); }}
            style={{
              position: 'relative',
              textDecoration: 'none',
              width: 'auto',
            }}
          >"""

if old_brand in content:
    content = content.replace(old_brand, new_brand)
else:
    content = content.replace(old_brand.replace('\n', '\r\n'), new_brand.replace('\n', '\r\n'))

# 4. Hide onBack on mobile
old_onback = """        <div
          style={{
            width: '100%',
            height: '10.8vh',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4vh 2vw',
          }}
        >
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {onBack && ("""

new_onback = """        <div
          style={{
            width: '100%',
            height: '10.8vh',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '4vh 2vw',
          }}
        >
          <div className="hidden md:flex" style={{ flex: 1, alignItems: 'center', gap: '1rem' }}>
            {onBack && ("""

if old_onback in content:
    content = content.replace(old_onback, new_onback)
else:
    content = content.replace(old_onback.replace('\n', '\r\n'), new_onback.replace('\n', '\r\n'))

with open(file_path, 'w', encoding='utf-8', newline='') as f:
    f.write(content)

print("Applied successfully.")
