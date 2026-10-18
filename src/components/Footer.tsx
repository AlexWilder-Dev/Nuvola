import cloudUrl from '../assets/cloud.svg'
import Wordmark from './Wordmark'
import { brand, sites, siteOrder } from '../data/nuvola'

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <img src={cloudUrl} alt="" className="footer-cloud" />
          <Wordmark className="footer-word" />
          <p className="caps">Biga pizza</p>
        </div>

        <div className="footer-col">
          {siteOrder.map((id) => (
            <p key={id}>
              <strong>{sites[id].name}</strong>
              <br />
              {sites[id].addressLine}
              {sites[id].phone && (
                <>
                  <br />
                  <a href={`tel:${sites[id].phone!.replace(/\s/g, '')}`}>{sites[id].phone}</a>
                </>
              )}
            </p>
          ))}
        </div>

        <div className="footer-col">
          <p>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
          {brand.socials.map((s) => (
            <p key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            </p>
          ))}
        </div>
      </div>
      <div className="wrap footer-base">
        <p>{brand.legal}</p>
        <p>Site by AlexWilder-Dev</p>
      </div>
    </footer>
  )
}
