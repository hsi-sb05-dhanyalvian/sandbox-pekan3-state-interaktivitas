//- app/page.tsx

import PaletteComp from '@/components/palette';
import FooterComp from '@/components/footer';

export default function PaletteGeneratorPage() {
  return (
    <div className='bg-slate-900 min-h-screen'>
      <main className="flex flex-col items-center justify-center p-8 pb-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">Generator Palet Warna</h1>
          <p className="text-slate-400 mt-2">Klik tombol `Generate` untuk mendapatkan kombinasi warna baru.</p>
        </div>

        <PaletteComp />
      </main>
      
      <FooterComp />
    </div>
  );
}
