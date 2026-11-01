import affectionate from './lyra-affectionate.png'
import agree from './lyra-agree.png'
import angry from './lyra-angry.png'
import awkward from './lyra-awkward.png'
import celebrate from './lyra-celebrate.png'
import confused from './lyra-confused.png'
import disagree from './lyra-disagree.png'
import happy from './lyra-happy.png'
import sad from './lyra-sad.png'
import surprised from './lyra-surprised.png'
import thanks from './lyra-thanks.png'
import tired from './lyra-tired.png'

/** Static LYRA artwork shared by the catalog and saved chat slices. */
export const chatStickers = [
  { id: 'lyra-happy', description: 'Happy', src: happy, emotions: ['happy'] as const },
  { id: 'lyra-sad', description: 'Sad', src: sad, emotions: ['sad'] as const },
  { id: 'lyra-confused', description: 'Confused', src: confused, emotions: ['confused'] as const },
  { id: 'lyra-surprised', description: 'Surprised', src: surprised, emotions: ['surprised'] as const },
  { id: 'lyra-thanks', description: 'Thank you', src: thanks, emotions: ['thanks', 'affectionate'] as const },
  { id: 'lyra-celebrate', description: 'Celebration', src: celebrate, emotions: ['celebrate', 'happy'] as const },
  { id: 'lyra-angry', description: 'Angry', src: angry, emotions: ['angry'] as const },
  { id: 'lyra-tired', description: 'Tired', src: tired, emotions: ['tired'] as const },
  { id: 'lyra-affectionate', description: 'Love', src: affectionate, emotions: ['affectionate', 'happy'] as const },
  { id: 'lyra-awkward', description: 'Awkward', src: awkward, emotions: ['awkward'] as const },
  { id: 'lyra-agree', description: 'Yes', src: agree, emotions: ['agree'] as const },
  { id: 'lyra-disagree', description: 'No thanks', src: disagree, emotions: ['disagree'] as const },
] as const
