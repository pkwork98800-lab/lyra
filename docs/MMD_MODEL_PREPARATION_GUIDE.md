# MMD Model Preparation Guide for LYRA

This guide explains how to prepare MMD (PMX) models with full animation sets for use in LYRA, including lip-sync, expressions, gaze tracking, physics, and idle motions.

## Table of Contents

1. [Model Requirements](#model-requirements)
2. [Morph Setup](#morph-setup)
3. [Motion Files (VMD)](#motion-files-vmd)
4. [Physics & IK Configuration](#physics--ik-configuration)
5. [Gaze & Head Tracking](#gaze--head-tracking)
6. [Material & Lighting](#material--lighting)
7. [Testing in LYRA](#testing-in-lyra)
8. [Troubleshooting](#troubleshooting)

---

## Model Requirements

### File Format
- **Primary**: `.pmx` (recommended) or `.pmd`
- **Textures**: `.png`, `.jpg`, `.tga` (in same folder or `textures/` subfolder)
- **Motions**: `.vmd` files (separate files per animation)

### Skeleton Requirements
The model must have these **standard bones** (Japanese names):

| LYRA Bone | Standard PMX Name | Purpose |
|-----------|-------------------|---------|
| Head | `頭` | Head rotation for gaze |
| Neck | `首` | Secondary head movement |
| Left Eye | `左目` | Left eye gaze |
| Right Eye | `右目` | Right eye gaze |
| Both Eyes | `両目` | Binocular gaze (optional) |
| Body | `センター` / `全ての親` | Root body movement |
| Left Arm | `左腕` / `左肩` | IK target for left arm |
| Right Arm | `右腕` / `右肩` | IK target for right arm |
| Left Leg | `左足` / `左足ＩＫ` | IK target for left leg |
| Right Leg | `右足` / `右足ＩＫ` | IK target for right leg |

### Recommended: Semi-Standard Bones
These enable advanced features:
- `上半身` / `上半身2` - Upper body twist
- `腰` / `腰2` - Hip rotation
- `左目.キャンセル` / `右目.キャンセル` - Eye cancel bones (for gaze clamping)

---

## Morph Setup

### Required Morphs (Lip-Sync)
Your model **must** have these vowel morphs for lip-sync to work:

| Slot | Japanese Name | English Fallback | Description |
|------|---------------|------------------|-------------|
| `vowelA` | `あ` | `a` | Mouth open wide (a) |
| `vowelI` | `い` | `i` | Mouth stretched (i) |
| `vowelU` | `う` | `u` | Mouth rounded (u) |
| `vowelE` | `え` | `e` | Mouth mid-open (e) |
| `vowelO` | `お` | `o` | Mouth rounded small (o) |

### Required Morphs (Expressions)
At minimum, include these expression morphs:

| Slot | Japanese Candidates | English Fallbacks | Purpose |
|------|---------------------|-------------------|---------|
| `smile` | `笑い`, `にこり`, `わらい` | `smile`, `Smile` | Happiness |
| `anger` | `怒り`, `いかり` | `anger`, `Anger` | Anger |
| `sad` | `悲しい`, `悲しむ` | `sad`, `Sad` | Sadness |
| `surprise` | `驚き`, `びっくり` | `surprise`, `Surprise` | Shock |
| `troubled` | `困る`, `こまる` | `troubled`, `Troubled` | Confusion |
| `serious` | `真面目`, `じと目` | `serious`, `Serious` | Concentration |

### Blink Morphs
| Slot | Japanese | English | Purpose |
|------|----------|---------|---------|
| `blink` | `まばたき` | `blink` | Both eyes blink |
| `blinkLeft` | `ウィンク` | `wink` | Left wink |
| `blinkRight` | `ウィンク右` | `wink_r` | Right wink |

### Recommended Additional Morphs
| Slot | Purpose |
|------|---------|
| `vowelA`..`vowelO` | Lip-sync vowels |
| `smile` | Happiness |
| `anger` | Anger |
| `sad` | Sadness |
| `surprise` | Surprise |
| `troubled` | Confusion/awkward |
| `serious` | Concentration |
| `blink` / `blinkLeft` / `blinkRight` | Blinking/winking |

### Morph Naming Tips
- **Use Japanese names** as primary - most MMD models use them
- **Add English fallbacks** for Western models
- **Multiple candidates per slot** - LYRA tries each in order
- **Avoid spaces/special chars** in morph names

---

## Motion Files (VMD)

### Required Motion Types

| Motion | Purpose | Loop |
|--------|---------|------|
| `idle` / `待機` | Default standing pose | ✓ Yes |
| `walk` / `歩き` | Walking | ✓ Yes |
| `run` / `走り` | Running | ✓ Yes |
| `sit` / `座り` | Sitting | No |
| `wave` / `手を振る` | Greeting | ✗ No |
| `nod` / `頷き` | Agreement | ✗ No |
| `shake` / `首を振る` | Disagreement | ✗ No |
| `heart` / `ハート` | Love gesture | ✗ No |

### Naming Convention
```
motions/
  idle.vmd
  walk.vmd
  run.vmd
  sit.vmd
  wave.vmd
  nod.vmd
  shake.vmd
  heart.vmd
  ...
```

### Motion Requirements
- **Frame rate**: 30 FPS (standard MMD)
- **Bone names** must match model's bone names exactly
- **Morph tracks** included for facial animation during motion
- **Loop seamlessly** for idle/walk/run (first frame = last frame)

### Idle Motion
The idle motion should:
- Be subtle (breathing, slight sway, blinking)
- Loop seamlessly (60-120 seconds recommended)
- Include subtle morph animation (breathing, blinking)
- Not have large position changes

### Recommended Motion Set
| File | Duration | Loop | Description |
|------|----------|------|-------------|
| `idle.vmd` | 60-120s | ✓ | Subtle breathing, blinking, weight shift |
| `idle_relaxed.vmd` | 60-120s | ✓ | Relaxed pose, arms down |
| `idle_excited.vmd` | 30-60s | ✓ | Energetic, bouncing |
| `walk.vmd` | 2-4s | ✓ | Natural walk cycle |
| `run.vmd` | 1-2s | ✓ | Running cycle |
| `wave.vmd` | 2-3s | ✗ | Friendly wave |
| `nod.vmd` | 1-2s | ✗ | Single nod |
| `shake.vmd` | 1-2s | ✗ | Head shake |
| `heart.vmd` | 3-4s | ✗ | Heart hands gesture |
| `bow.vmd` | 2-3s | ✗ | Polite bow |

---

## Physics & IK Configuration

### Physics Setup (in PMX Editor)
1. **Rigid Bodies**: Add to hair, skirt, sleeves, accessories
2. **Joints**: Connect rigid bodies for natural movement
3. **Settings**:
   - Gravity: `(0, -9.8, 0)` or model-appropriate
   - Iterations: 8-16 (higher = more stable)
   - Sub-steps: 3-4

### Hair Physics
- Create rigid bodies for each hair segment
- Connect with 6DOF joints
- Limit angles to prevent clipping

### Skirt/Cloth Physics
- One rigid body per pleat/section
- Connect vertically with joints
- Add wind effector (optional)

### IK Configuration
Enable IK for these bone chains:
- **Arms**: `肩` → `腕` → `ひじ` → `手首` → `手先`
- **Legs**: `足` → `ひざ` → `足首` → `足先`
- **Head**: `首` → `頭` (for gaze)

### Grant Settings
Enable "Grant" (親子付与) for:
- `髪` (hair) → `頭` (head)
- `スカート` (skirt) → `腰` (hip)
- Accessories → relevant parent bone

---

## Gaze & Head Tracking

### Eye Bones
Required for gaze tracking:
- `左目` (left eye) - horizontal/vertical rotation
- `右目` (right eye) - horizontal/vertical rotation
- `両目` (both eyes) - optional, for binocular gaze

### Head Bone
- `頭` (head) - primary head rotation
- `首` (neck) - secondary, dampened movement

### Gaze Limits (LYRA defaults)
| Axis | Limit |
|------|-------|
| Yaw (horizontal) | ±40° |
| Pitch (vertical) | ±30° |

Configure in PMX Editor:
- Eye bones: Limit rotation to ±0.7 rad (~40°)
- Head bone: Limit to ±0.5 rad (~30°) pitch, ±0.7 rad yaw

### Gaze Modes (LYRA Settings)
| Mode | Behavior |
|------|----------|
| `camera` | Look at camera |
| `mouse` | Follow cursor |
| `none` | Idle saccades only |

---

## Material & Lighting

### Toon Shading
LYRA uses **toon shading** (no PBR):
- **Disable** PBR/metallic/roughness workflows
- Use **toon ramp textures** (1D gradient)
- Set `NoToneMapping` in renderer

### Material Settings
| Property | Recommended |
|----------|-------------|
| Diffuse | Base color |
| Specular | Low (0.1-0.3) |
| Shininess | 5-20 |
| Ambient | 0.3-0.5 |
| Toon Ramp | 256x16 or 512x16 |

### Self-Glow (Albedo Glow)
LYRA supports albedo glow for emissive effects:
- Enable in material settings
- Use for eyes, magical effects, outlines

### Outline (Edge)
- Enable in PMX material settings
- Color: Dark (black/dark blue)
- Width: 0.5-2.0 (model scale dependent)

---

## Testing in LYRA

### 1. Import Model
1. Settings → Models → `+` → Load from File/URL
2. Select `.pmx` file
3. LYRA auto-detects morphs/bones

### 2. Verify Morphs
Settings → Model → MMD → check:
- [ ] Vowel morphs detected (あ/い/う/え/お)
- [ ] Expression morphs (smile, anger, sad, etc.)
- [ ] Blink morphs detected
- [ ] Eye bones detected (`左目`, `右目`)

### 3. Test Motions
1. Settings → Model → MMD → Idle Motion → Select `idle`
2. Enable Physics + IK
3. Test gaze: Settings → Model → MMD → Gaze → `mouse`
4. Move mouse - eyes/head should follow

### 4. Test Lip-Sync
1. Settings → Providers → Add transcription + TTS
2. Chat with character
3. Verify mouth moves with speech

### 5. Test Expressions
1. Settings → Model → MMD → Emotions
2. Test each emotion mapping
3. Verify morph transitions are smooth

---

## Troubleshooting

### Lip-Sync Not Working
| Issue | Solution |
|-------|----------|
| No vowel morphs found | Check morph names match `あ/い/う/え/お` or `a/i/u/e/o` |
| Mouth doesn't move | Check vowel morphs resolved in Settings → Model → MMD |
| Mouth stuck open | Check `vowelA`..`vowelO` not stuck at 1.0 |

### Expressions Not Working
| Issue | Solution |
|-------|----------|
| Expressions not showing | Check expression morph names (`笑い`, `smile`, etc.) |
| Morphs not resolving | Check Settings → Model → MMD → Morph Overrides |
| Expression snapping | Check `blendDuration` in `EMOTION_MORPHS` |

### Gaze Not Working
| Issue | Solution |
|-------|----------|
| Eyes don't move | Check eye bone names (`左目`, `右目`, `両目`) |
| Eyes clip through head | Check eye bone rotation limits in PMX |
| Head doesn't follow | Check `頭` and `首` bone names |

### Physics Issues
| Issue | Solution |
|-------|----------|
| Hair explodes | Reduce joint limits, increase iterations |
| Clipping | Adjust rigid body shapes, add collision groups |
| Jitter | Increase physics iterations (8→16) |

### Motion Issues
| Issue | Solution |
|-------|----------|
| Motion not playing | Check bone names match exactly |
| Motion distorted | Check bone names match model exactly |
| Idle not looping | Ensure first/last frame match |

### Model Not Loading
| Issue | Solution |
|-------|----------|
| `.pmx` not loading | Check file encoding (UTF-8), try re-saving in PMX Editor |
| Textures missing | Place textures in same folder or `textures/` subfolder |
| Model invisible | Check material opacity, culling mode |

---

## Advanced: Custom Emotion Mappings

### Per-Model Emotion Override
Create `model-emotions.json` in model folder:
```json
{
  "morphMap": {
    "smile": ["にっこり", "smile"],
    "anger": ["怒り", "angry"],
    "customHappy": ["にっこり", "smile", "にこり"]
  },
  "emotionOverrides": {
    "happy": { "smile": 0.9, "cheek": 0.4 },
    "excited": { "smile": 1.0, "vowelA": 0.3 }
  },
  "customEmotions": {
    "excited": { "animation": "excited", "morphs": { "smile": 1.0 } }
  }
}
```

Place next to `.pmx` file - LYRA auto-loads it.

---

## Resources

### Model Sources
- **Booth.pm** - Japanese creator marketplace (search "PMX 配布")
- **HuggingFace** - `lyra-org/mmd-models` (curated)
- **VRoid Hub** → Export to MMD → PMX
- **NicoNiCommons** - `モデル配布` tag

### Tools
- **PMX Editor** - Standard MMD model editor
- **MMD** (MikuMikuDance) - Motion creation
- **Blender** + `mmd_tools` - Full pipeline
- **VRoid Studio** → Export → PMX

### Documentation
- [LYRA MMD Settings](../settings/models/mmd.md)
- [MMD Morph Reference](./mmd-morph-reference.md)
- [VMD Motion Format](../vmd-format.md)

---

## Quick Checklist

Before importing to LYRA:
- [ ] Model has standard bones (`頭`, `首`, `左目`, `右目`, `センター`)
- [ ] Vowel morphs exist (`あ`, `い`, `う`, `え`, `お`)
- [ ] Expression morphs exist (`笑い`, `怒り`, `悲しい`, etc.)
- [ ] Blink morphs exist (`まばたき`, `ウィンク`)
- [ ] Eye bones exist (`左目`, `右目`)
- [ ] Physics bodies for hair/skirt
- [ ] IK chains for arms/legs/head
- [ ] At least one idle motion (`.vmd`)
- [ ] Textures in same folder or `textures/`
- [ ] File encoding UTF-8 (re-save in PMX Editor if unsure)

---

*Last updated: LYRA v0.14.1*
*For questions: GitHub Discussions or Discord #mmd-models*
