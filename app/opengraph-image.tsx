import { ImageResponse } from 'next/og'

export const alt = 'SodaSnacks - Digital Studio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#fbf9f0',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', width: 56, height: 56, background: '#3a86ff' }} />
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color: '#3a3a38' }}>
            SodaSnacks
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 32, color: '#3a3a38', marginTop: 28 }}>
          Fresh Ideas. Tasty Solutions.
        </div>
        <div style={{ display: 'flex', fontSize: 22, color: '#666666', marginTop: 20 }}>
          Web Apps · Admin Systems · ERPNext Customization
        </div>
      </div>
    ),
    { ...size },
  )
}
