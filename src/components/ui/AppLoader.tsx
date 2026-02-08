import './AppLoader.css'

type Props = {
    fullscreen?: boolean
}

export const AppLoader = ({ fullscreen = true }: Props) => {
    return (
        <div className={fullscreen ? 'loader-overlay' : 'loader-inline'}>
            <div className="loader-content">
                <div className="logo-spin"><img src="/pingwin/pingwin.jpg" className="logo-spin" /></div>
                <div className="loader-text">Ładowanie…</div>
            </div>
        </div>
    )
}