import { Pause, Play, Hourglass, CheckCheck } from 'lucide-react'

export const StatusBadge = ({status}) => {

            if(status === 'inAttesa'){
            return(
            <span className="badge rounded-pill bg-secondary-subtle text-secondary-emphasis" title="In attesa">
                <Pause size={16} aria-hidden="true" />
                <span className="visually-hidden">In attesa</span>
            </span>
            )
        }

            if(status === 'Attiva'){
                return(
            <span className="badge badgeAttiva rounded-pill text-secondary-emphasis" title="Attiva">
                <Play size={16} aria-hidden="true" />
                <span className="visually-hidden">Attiva</span>
            </span>
            )
            }

            if(status === 'inProva'){
                return(
            <span className="badge badgeInProva rounded-pill text-secondary-emphasis" title="In Prova">
                <Hourglass size={16} aria-hidden="true" />
                <span className="visually-hidden">In Prova</span>
            </span>
            )
            }

            if(status === 'Chiusa'){
                return(
            <span className="badge badgeChiusa rounded-pill" title="Chiusa">
                <CheckCheck size={16} aria-hidden="true" />
                <span className="visually-hidden">Chiusa</span>
            </span>
            )
            
        }
        return status
        
}