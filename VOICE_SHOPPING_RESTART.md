# AIONYSUS VOICE SHOPPING EXPERIENCE - MOONSHOT BUILD PLAN

## THE VISION

Transform the voice widget from a "chatbot with wine cards tucked below" into a **split-screen visual shopping assistant** where wine bottles appear on a visual rack as the conversation progresses.

**User's exact words:**
> "When they start talking about and showing products, the voice widget sorts of moves to the left and on the right you get a wine rack. As soon as Burgundy's mentioned, it's effectively a filter system—just a wine rack displaying the filter, the Burgundy, pricing, etc., and a specific one in focus is on top."

---

## LAYOUT BEHAVIOR

### Desktop (md+)
```
┌─────────────────────────────────────────────────────────────────────┐
│                         AIONYSUS HEADER                             │
├────────────────────────┬────────────────────────────────────────────┤
│                        │                                            │
│   VOICE WIDGET         │              WINE RACK                     │
│   (Compact)            │                                            │
│                        │   ┌─────────────────────────────────┐     │
│   ┌────────────┐       │   │     FEATURED WINE (LARGE)       │     │
│   │  Goddess   │       │   │                                 │     │
│   │  Avatar    │       │   │  [Image]   Name                 │     │
│   │            │       │   │            Region • Vintage     │     │
│   └────────────┘       │   │            £XXX                 │     │
│                        │   │            [ADD TO CART]        │     │
│   "The Goddess         │   └─────────────────────────────────┘     │
│    speaks..."          │                                            │
│                        │   ┌─────────────────────────────────┐     │
│   [End Session]        │   │  FILTER BADGES                   │     │
│                        │   │  [Burgundy] [Under £500] [Red]   │     │
│                        │   └─────────────────────────────────┘     │
│                        │                                            │
│                        │   ALSO ON THE RACK:                        │
│                        │   ┌───────┐ ┌───────┐ ┌───────┐           │
│                        │   │ Wine  │ │ Wine  │ │ Wine  │           │
│                        │   │  2    │ │  3    │ │  4    │           │
│                        │   │ £xxx  │ │ £xxx  │ │ £xxx  │           │
│                        │   └───────┘ └───────┘ └───────┘           │
│                        │                                            │
└────────────────────────┴────────────────────────────────────────────┘
```

### Mobile (< md)
```
┌─────────────────────────────┐
│      AIONYSUS HEADER        │
├─────────────────────────────┤
│                             │
│  WINE RACK (ABOVE!)         │
│  ┌───────────────────────┐  │
│  │   FEATURED WINE       │  │
│  │   [Image] Name £XXX   │  │
│  │   [ADD TO CART]       │  │
│  └───────────────────────┘  │
│                             │
│  [Burgundy] [£500] [Red]    │
│                             │
│  Also discussed:            │
│  ┌─────┐ ┌─────┐ ┌─────┐   │
│  │ 🍷 │ │ 🍷 │ │ 🍷 │   │
│  └─────┘ └─────┘ └─────┘   │
│                             │
├─────────────────────────────┤
│                             │
│  VOICE WIDGET (BELOW)       │
│  ┌─────────────────┐        │
│  │    Goddess      │        │
│  │    Avatar       │        │
│  └─────────────────┘        │
│  "She awaits your words..." │
│  [Commune with the Goddess] │
│                             │
└─────────────────────────────┘
```

---

## USER JOURNEY FLOW

### 1. Initial State (Not Connected)
- Voice widget shows goddess avatar
- "Tap to commune with Aionysus"
- Wine rack is EMPTY or shows subtle placeholder text: *"Your discoveries will appear here..."*

### 2. Connection State
- User taps → "Summoning..."
- Layout remains, rack still empty
- Connection established → "The Goddess awaits..."

### 3. First Search Criteria Mentioned
User: "I want a red Burgundy under £500"

**Voice Widget:**
- Goddess responds: "Ah, Burgundy—the heart of fine wine..."

**Wine Rack Updates:**
- Filter badges appear: `[Burgundy]` `[Red]` `[Under £500]`
- Subtle animation as badges slide in

### 4. First Wine Recommended
Aionysus: "From my collection—the 2019 Domaine de la Romanée-Conti..."

**Wine Rack Updates:**
- Featured wine slot animates in (bottle rising from below or fading in)
- Large image, name, region, vintage, price
- **ADD TO CART** button visible immediately
- Soft glow effect on featured wine

### 5. Second Wine Mentioned
User: "Something a bit older?"
Aionysus: "Let me suggest the 2015 Gevrey-Chambertin..."

**Wine Rack Updates:**
- Previous wine slides down to "shelf" (smaller cards)
- New wine takes the featured slot
- Animation: wine bottle transitioning from featured to shelf

### 6. Filters Change Mid-Conversation
User: "Actually, show me some white wines instead"

**Wine Rack Updates:**
- Badge changes: `[Red]` becomes `[White]` with subtle transition
- Discussed wines remain on shelf (they were part of conversation)
- Featured slot updates when new wine recommended

### 7. Add to Cart
User clicks ADD TO CART on featured wine:
- Button animates (sparkle effect, like product page)
- Wine stays visible but shows "✓ In Your Selection"
- Cart count updates in header

---

## COMPONENT ARCHITECTURE

### File Structure
```
/components/
├── VoiceWidget.tsx           # Existing - refactor to be compact
├── VoiceShopping/
│   ├── VoiceShoppingLayout.tsx   # Main split-screen container
│   ├── WineRack.tsx              # Right side wine display
│   ├── FeaturedWine.tsx          # Large featured wine card
│   ├── WineShelf.tsx             # Grid of previously discussed wines
│   ├── FilterBadges.tsx          # Search criteria badges
│   └── EmptyRack.tsx             # Empty state placeholder
└── ...
```

### Data Flow
```
VoiceWidget (handles Hume connection)
    │
    ├── Captures tool responses (search_wines, get_wine, recommend_wines)
    │
    ├── Extracts filter criteria from tool params
    │   └── { region: "Burgundy", wine_type: "red", max_price: 500 }
    │
    ├── Updates state:
    │   ├── featuredWine: Wine | null
    │   ├── discussedWines: Wine[]
    │   └── activeFilters: FilterCriteria
    │
    └── Passes to WineRack component
            │
            ├── FilterBadges receives activeFilters
            ├── FeaturedWine receives featuredWine
            └── WineShelf receives discussedWines
```

---

## DETAILED COMPONENT SPECS

### 1. VoiceShoppingLayout.tsx
```typescript
interface VoiceShoppingLayoutProps {
  children: React.ReactNode;  // VoiceWidget goes here
}

// Desktop: grid-cols-[400px_1fr] or [380px_1fr]
// Mobile: flex-col-reverse (rack on top, voice on bottom)

// Key: Voice widget needs to shrink horizontally on desktop
// but rack should be the visual focus
```

### 2. WineRack.tsx
```typescript
interface WineRackProps {
  featuredWine: Wine | null;
  discussedWines: Wine[];
  activeFilters: {
    region?: string;
    wine_type?: string;
    color?: string;
    max_price?: number;
    min_price?: number;
    country?: string;
  };
  onAddToCart: (wine: Wine) => void;
  isConnected: boolean;
}

// Empty state when !isConnected or no wines
// Animate wines in/out
// Handle cart state (show "In Your Selection" if already added)
```

### 3. FeaturedWine.tsx
```typescript
interface FeaturedWineProps {
  wine: Wine;
  onAddToCart: () => void;
  isInCart: boolean;
}

// Large card with:
// - Wine image (aspect-[3/4])
// - Name, vintage, region
// - Price (formatted)
// - Add to Cart button with sparkle effect
// - "In Your Selection" state if already in cart
// - Subtle glow/highlight effect
```

### 4. WineShelf.tsx
```typescript
interface WineShelfProps {
  wines: Wine[];
  onSelectWine: (wine: Wine) => void;
  onAddToCart: (wine: Wine) => void;
}

// Grid of smaller wine cards (3-4 across on desktop, 3 on mobile)
// Clicking a wine could move it to featured? Or just link to product page
// Show mini "+" button for quick add to cart
```

### 5. FilterBadges.tsx
```typescript
interface FilterBadgesProps {
  filters: {
    region?: string;
    wine_type?: string;
    color?: string;
    max_price?: number;
    country?: string;
  };
}

// Display as pill badges:
// [Burgundy] [Red] [Under £500]
// Animate in/out as filters change
// Color-coded by type (region=gold, type=wine color, price=green)
```

---

## FILTER BADGE EXTRACTION

When tool calls are made, extract parameters:

```typescript
// In VoiceWidget.tsx handleToolCall

case 'search_wines':
  const params = message.parameters;
  setActiveFilters({
    region: params.region,
    wine_type: params.wine_type,
    color: params.color,
    max_price: params.max_price,
    min_price: params.min_price,
    country: params.country
  });
  // ... execute tool and update wines
  break;
```

**Badge Display Logic:**
```typescript
const badges = [];

if (filters.region) badges.push({ type: 'region', label: filters.region });
if (filters.country) badges.push({ type: 'country', label: filters.country });
if (filters.wine_type) badges.push({ type: 'type', label: capitalize(filters.wine_type) });
if (filters.color) badges.push({ type: 'color', label: capitalize(filters.color) });
if (filters.max_price) badges.push({ type: 'price', label: `Under £${filters.max_price}` });
if (filters.min_price && filters.max_price) {
  badges.push({ type: 'price', label: `£${filters.min_price} - £${filters.max_price}` });
}
```

---

## ANIMATION SPECS

### Wine Bottle Entry (Featured)
```css
@keyframes wine-enter {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.wine-featured-enter {
  animation: wine-enter 0.4s ease-out;
}
```

### Wine to Shelf Transition
```css
@keyframes wine-to-shelf {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.6);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
```

### Badge Slide In
```css
@keyframes badge-enter {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.filter-badge {
  animation: badge-enter 0.3s ease-out;
}
```

---

## STYLING THEME

**Colors (from existing):**
- Background: `bg-stone-950`, `bg-stone-900`
- Gold accents: `gold-400`, `gold-500`, `gold-700`
- Text: `text-white`, `text-stone-300`, `text-stone-400`

**Wine Rack Background:**
- Subtle wood grain texture or gradient
- `bg-gradient-to-b from-stone-900/80 to-stone-950`
- Border: `border-gold-700/20`

**Featured Wine Card:**
- Elevated with shadow: `shadow-[0_8px_32px_rgba(0,0,0,0.4)]`
- Gold border glow when speaking: `border-gold-500/40`
- Background: `bg-stone-900/90 backdrop-blur-sm`

**Shelf Wines:**
- Smaller, compact
- Hover effect to enlarge slightly
- Quick-add "+" button on hover

---

## CART INTEGRATION

Reuse existing localStorage cart system (`sommelier-cart`):

```typescript
// In WineRack or FeaturedWine
const [localCart, setLocalCart] = useState<CartItem[]>([]);

useEffect(() => {
  const saved = localStorage.getItem('sommelier-cart');
  if (saved) setLocalCart(JSON.parse(saved));
}, []);

const addToCart = (wine: Wine) => {
  const newCart = [...localCart, {
    wine_id: wine.id,
    quantity: 1,
    name: wine.name,
    price: wine.price_retail,
    image_url: wine.image_url
  }];
  setLocalCart(newCart);
  localStorage.setItem('sommelier-cart', JSON.stringify(newCart));

  // Trigger cart update event for header
  window.dispatchEvent(new Event('cart-updated'));
};

const isInCart = (wineId: number) => {
  return localCart.some(item => item.wine_id === wineId);
};
```

---

## EMPTY STATES

### Before Connection
```tsx
<div className="flex flex-col items-center justify-center h-full text-center p-8">
  <div className="text-gold-500/30 text-6xl mb-4">🍷</div>
  <p className="text-stone-400 text-lg">
    Your discoveries will appear here...
  </p>
  <p className="text-stone-500 text-sm mt-2">
    Commune with the Goddess to begin
  </p>
</div>
```

### Connected But No Wines Yet
```tsx
<div className="flex flex-col items-center justify-center h-full text-center p-8">
  <div className="w-16 h-16 border-2 border-gold-500/20 border-t-gold-500/60 rounded-full animate-spin mb-4" />
  <p className="text-stone-400">
    The Goddess is preparing her recommendations...
  </p>
</div>
```

---

## MOBILE CONSIDERATIONS

1. **Rack on top, Voice on bottom** (flex-col-reverse or explicit ordering)
2. **Featured wine is compact but prominent** (horizontal card layout)
3. **Shelf wines as horizontal scroll** (not grid)
4. **Badges below featured wine**
5. **Voice widget at bottom like a music player** (fixed? or scrollable?)

```tsx
// Mobile layout
<div className="flex flex-col md:flex-row min-h-screen">
  {/* Wine Rack - appears FIRST on mobile (but visually on top via order) */}
  <div className="order-1 md:order-2 md:flex-1">
    <WineRack />
  </div>

  {/* Voice Widget - appears SECOND on mobile (visually below) */}
  <div className="order-2 md:order-1 md:w-[380px]">
    <VoiceWidget />
  </div>
</div>
```

---

## IMPLEMENTATION ORDER

### Phase 1: Layout Structure
1. Create `VoiceShoppingLayout.tsx` with responsive grid
2. Refactor `VoiceWidget.tsx` to be compact (narrower)
3. Create placeholder `WineRack.tsx`
4. Test layout on desktop and mobile

### Phase 2: Wine Rack Core
1. Build `FeaturedWine.tsx` with Add to Cart
2. Build `WineShelf.tsx` for discussed wines
3. Wire up `featuredWine` and `discussedWines` from VoiceWidget
4. Test wine display updates with real Hume connection

### Phase 3: Filter Badges
1. Build `FilterBadges.tsx`
2. Extract filter params from tool calls in VoiceWidget
3. Pass `activeFilters` to WineRack
4. Test badge updates during conversation

### Phase 4: Animations & Polish
1. Add wine bottle entry animations
2. Add badge slide-in animations
3. Add featured-to-shelf transitions
4. Add sparkle effect on Add to Cart
5. Test full flow end-to-end

### Phase 5: Mobile Optimization
1. Test and refine mobile layout
2. Horizontal scroll for shelf wines
3. Compact featured wine card
4. Voice widget positioning

---

## TESTING CHECKLIST

- [ ] Desktop layout shows voice left, rack right
- [ ] Mobile layout shows rack on top, voice below
- [ ] Empty state shows before connection
- [ ] Filters appear as badges when search_wines called
- [ ] Featured wine updates when get_wine or recommend_wines called
- [ ] Previous wine moves to shelf when new one featured
- [ ] Add to Cart works and updates localStorage
- [ ] "In Your Selection" shows for carted wines
- [ ] Cart count in header updates
- [ ] Animations are smooth (no jank)
- [ ] Works with actual Hume voice connection
- [ ] Wines match what Aionysus recommends (not text matching)

---

## KEY FILES TO MODIFY

1. `/components/VoiceWidget.tsx` - Add filter extraction, pass data up
2. `/app/page.tsx` - Wrap with VoiceShoppingLayout
3. **NEW:** `/components/VoiceShopping/VoiceShoppingLayout.tsx`
4. **NEW:** `/components/VoiceShopping/WineRack.tsx`
5. **NEW:** `/components/VoiceShopping/FeaturedWine.tsx`
6. **NEW:** `/components/VoiceShopping/WineShelf.tsx`
7. **NEW:** `/components/VoiceShopping/FilterBadges.tsx`
8. `/app/globals.css` - Add new animations

---

## CONTEXT FROM PREVIOUS SESSION

**What's already working:**
- VoiceWidget captures wines from tool responses (not text matching)
- Cart system with localStorage persistence
- Mystical wording ("Commune with the Goddess", etc.)
- LottieGoddess/SplineGoddess components for avatar

**Current VoiceWidget state:**
```typescript
const [wines, setWines] = useState<Wine[]>([])           // Latest wine(s)
const [discussedWines, setDiscussedWines] = useState<Wine[]>([])  // History
const [localCart, setLocalCart] = useState<CartItem[]>([])
```

These map directly to:
- `wines[0]` → Featured wine
- `discussedWines` → Shelf wines
- Need to ADD: `activeFilters` state

---

## QUICK START COMMAND

To begin implementation:
```bash
# Read the current VoiceWidget to understand state structure
cat /Users/dankeegan/aionysus/components/VoiceWidget.tsx

# Then create the new components
mkdir -p /Users/dankeegan/aionysus/components/VoiceShopping
```

---

**END OF RESTART PLAN**

This document contains everything needed to implement the split-screen voice shopping experience. The vision is clear: transform a chatbot into a visual shopping assistant where wine bottles appear on a rack as the goddess recommends them.
