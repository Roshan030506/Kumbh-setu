import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage, Facility } from '../../types';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MapPin, 
  Compass, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Info,
  HelpCircle
} from 'lucide-react';

export const AiAssistant: React.FC = () => {
  const { 
    facilities, 
    setSelectedFacility, 
    setPilgrimScreen, 
    playClick, 
    soundEnabled,
    language 
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'assistant',
      text: 'Namaste! I am your AI Mela Sahayak for Kumbh Mela 2026, Nashik. I can guide you to nearest bio-toilets, holy ghats, free Annakshetra food, emergency medical camps, or safe crowd routes. How may I assist you today?',
      timestamp: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    'Where is the nearest toilet?',
    'Find free food/prasadam',
    'Nearest emergency medical camp',
    'Is Ramkund crowded right now?',
    'When is the next Shahi Snan?',
    'Where can I get clean drinking water?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    playClick();

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Mock intelligent response logic pulled from seeded facilities
    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();
      let responseText = '';
      let recommendedFacility: Facility | undefined = undefined;

      if (lower.includes('toilet') || lower.includes('washroom') || lower.includes('bathroom') || lower.includes('शौचालय')) {
        recommendedFacility = facilities.find(f => f.category === 'toilet');
        responseText = `The closest sanitation facility is ${recommendedFacility?.name} located ${recommendedFacility?.distanceMeters} meters away at ${recommendedFacility?.address}. It features 30 bio-cabin units, disabled accessibility ramps, and is cleaned continuously.`;
      } else if (lower.includes('food') || lower.includes('prasadam') || lower.includes('langar') || lower.includes('bhojan') || lower.includes('भोजन') || lower.includes('प्रसाद')) {
        recommendedFacility = facilities.find(f => f.category === 'food' && f.isFree);
        responseText = `For free, hygienic Satvik Mahaprasad, visit ${recommendedFacility?.name}. Continuous langar is serving hot fresh meals (Rice, Dal, Roti, Sabzi) with dedicated elderly seating rows. Current wait time is only ~8 minutes.`;
      } else if (lower.includes('medical') || lower.includes('doctor') || lower.includes('hospital') || lower.includes('first aid') || lower.includes('चिकित्सा') || lower.includes('डॉक्टर')) {
        recommendedFacility = facilities.find(f => f.category === 'medical');
        responseText = `Nearest 24/7 medical station is ${recommendedFacility?.name} (${recommendedFacility?.distanceMeters}m away). Fully equipped with 20 critical beds, doctors, heat-stroke cooling units, and standby ambulances. Helpline: ${recommendedFacility?.contactPhone || '108'}.`;
      } else if (lower.includes('water') || lower.includes('drink') || lower.includes('पानी') || lower.includes('जल')) {
        recommendedFacility = facilities.find(f => f.category === 'water');
        responseText = `Free UV-treated cold drinking water is available right now at ${recommendedFacility?.name} (${recommendedFacility?.distanceMeters}m away, opposite Sita Gufa). 40 dispensing taps active with zero wait time.`;
      } else if (lower.includes('shahi snan') || lower.includes('date') || lower.includes('timing') || lower.includes('स्नान')) {
        responseText = `Kumbh Mela 2026 Nashik Shahi Snan dates:\n• First Shahi Snan (Simhastha Aarambh): August 28, 2026\n• Second Main Royal Bath (Bhadrapada Amavasya): September 12, 2026\n• Third Shahi Snan: September 25, 2026\n\nPeak auspicious hours are 04:00 AM to 09:30 AM at Ramkund and Kushavarta Kund.`;
      } else if (lower.includes('crowd') || lower.includes('ramkund') || lower.includes('गर्दी') || lower.includes('भीड़')) {
        recommendedFacility = facilities.find(f => f.id === 'fac-1');
        responseText = `Ramkund Sacred Bathing Ghat is currently experiencing HIGH density (~88% capacity, wait time ~12 mins). For senior citizens or families seeking a calmer holy bath, our AI recommends Laxman Kund or Kapila-Godavari Sangam Ghat (~35% capacity, only 5 min walk).`;
      } else {
        recommendedFacility = facilities.find(f => f.id === 'fac-1');
        responseText = `Here are the verified pilgrimage logistics for Nashik Kumbh 2026. Ramkund core ghat is currently operational with 15 rescue divers on duty. You can check crowd-aware bypass routes or explore verified amenities on the holy map.`;
      }

      const botMsg: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        facilityRecommendation: recommendedFacility,
        actionButton: recommendedFacility ? {
          label: `View ${recommendedFacility.category.toUpperCase()} on Map`,
          screen: 'home_map',
          targetId: recommendedFacility.id
        } : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleActionClick = (facility: Facility) => {
    playClick();
    setSelectedFacility(facility);
    setPilgrimScreen('home_map');
  };

  return (
    <div className="h-[calc(100vh-112px)] md:h-[calc(100vh-100px)] max-w-4xl mx-auto w-full flex flex-col bg-stone-900 border-x border-stone-800 text-stone-100 shadow-2xl">
      
      {/* Header Banner */}
      <div className="p-3.5 sm:p-4 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-stone-950 shadow-md">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-amber-100 font-cinzel">AI Mela Sahayak</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Online • Seeded Knowledge
              </span>
            </div>
            <p className="text-xs text-stone-400">Intelligent pilgrim assistance grounded in Nashik Mela datasets</p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-stone-400 bg-stone-900 px-2.5 py-1 rounded-lg border border-stone-800">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Local Mock / AI Fallback Mode</span>
        </div>
      </div>

      {/* Message Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mb-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg ${
                  msg.sender === 'user'
                    ? 'bg-amber-600 text-white rounded-br-none'
                    : 'bg-stone-950 border border-stone-800 text-stone-200 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line font-medium">
                  {msg.text}
                </div>

                {/* Facility Recommendation Mini-Card */}
                {msg.facilityRecommendation && (
                  <div className="mt-3 p-2.5 rounded-xl bg-stone-900 border border-stone-700/80 text-stone-100">
                    <div className="flex items-start gap-2.5">
                      <img
                        src={msg.facilityRecommendation.photos[0]}
                        alt={msg.facilityRecommendation.name}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-stone-800"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-amber-400">
                            {msg.facilityRecommendation.category}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            ~{msg.facilityRecommendation.waitTimeMinutes ?? 5} min wait
                          </span>
                        </div>
                        <h5 className="text-xs font-bold truncate text-stone-100">
                          {msg.facilityRecommendation.name}
                        </h5>
                        <p className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>{msg.facilityRecommendation.distanceMeters}m away</span>
                        </p>
                      </div>
                    </div>

                    <button
                      id={`btn-chat-view-map-${msg.facilityRecommendation.id}`}
                      onClick={() => handleActionClick(msg.facilityRecommendation!)}
                      className="mt-2.5 w-full py-1.5 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Pinpoint on Map & Get Directions</span>
                    </button>
                  </div>
                )}

                <div className="mt-1 text-[10px] text-stone-400/80 text-right">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-2 text-stone-400 text-xs">
            <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 rounded-2xl bg-stone-950 border border-stone-800 rounded-bl-none flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-2 border-t border-stone-800/80 bg-stone-950/60 overflow-x-auto no-scrollbar flex items-center gap-1.5">
        <span className="text-[10px] text-stone-400 uppercase font-bold shrink-0 ml-1">Suggestions:</span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            id={`quick-prompt-${idx}`}
            onClick={() => handleSend(prompt)}
            className="text-[11px] px-2.5 py-1 rounded-lg bg-stone-900 hover:bg-stone-800 border border-stone-800 text-stone-300 hover:text-amber-300 whitespace-nowrap transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{prompt}</span>
          </button>
        ))}
      </div>

      {/* Input Box */}
      <div className="p-3 bg-stone-950 border-t border-stone-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            id="input-ai-assistant-query"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about nearest toilet, medical camp, ghat crowd, or food..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-100 placeholder-stone-500 text-xs sm:text-sm focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            id="btn-send-ai-query"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold disabled:opacity-40 transition-all shadow-md shadow-amber-500/20 active:scale-95 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
};
