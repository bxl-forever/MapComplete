import { InputElement } from "./InputElement"
import { UIEventSource } from "../../Logic/UIEventSource"
import Combine from "../Base/Combine"
import Svg from "../../Svg"
import BaseUIElement from "../BaseUIElement"
import { FixedUiElement } from "../Base/FixedUiElement"
import { Utils } from "../../Utils"
import Loc from "../../Models/Loc"
import Minimap from "../Base/Minimap"

/**
 * Selects a direction in degrees
 */
export default class DirectionInput extends InputElement<string> {
    public readonly IsSelected: UIEventSource<boolean> = new UIEventSource<boolean>(false)
    private readonly _location: UIEventSource<Loc>
    private readonly value: UIEventSource<string>
    private background

    constructor(
        mapBackground: UIEventSource<any>,
        location: UIEventSource<Loc>,
        value?: UIEventSource<string>
    ) {
        super()
        this._location = location
        this.value = value ?? new UIEventSource<string>(undefined)
        this.background = mapBackground
    }

    GetValue(): UIEventSource<string> {
        return this.value
    }

    IsValid(str: string): boolean {
        const t = Number(str)
        return !isNaN(t) && t >= 0 && t <= 360
    }

    protected InnerConstructElement(): HTMLElement {
        let map: BaseUIElement = new FixedUiElement("")
        if (!Utils.runningFromConsole) {
            map = Minimap.createMiniMap({
                background: this.background,
                allowMoving: false,
                location: this._location,
            })
        }

        const element = new Combine([
            Svg.direction_stroke_svg()
                .SetStyle(
                    `position: absolute;top: 0;left: 0;width: 100%;height: 100%;transform:rotate(${
                        this.value.data ?? 0
                    }deg);`
                )
                .SetClass("direction-svg relative")
                .SetStyle("z-index: 1000"),
            map.SetStyle(`position: absolute;top: 0;left: 0;width: 100%;height: 100%;`),
        ])
            .SetStyle("width: min(100%, 25em); height: 0; padding-bottom: 100%") // A bit a weird CSS   , see https://stackoverflow.com/questions/13851940/pure-css-solution-square-elements#19448481
            .SetClass("relative block bg-white border border-black overflow-hidden rounded-full")
            .ConstructElement()

        this.value.addCallbackAndRunD((rotation) => {
            const cone = element.getElementsByClassName("direction-svg")[0] as HTMLElement
            cone.style.transform = `rotate(${rotation}deg)`
        })

        this.RegisterTriggers(element)
        element.style.overflow = "hidden"
        element.style.display = "block"

        return element
    }

    private RegisterTriggers(htmlElement: HTMLElement) {
        const self = this

        function onPosChange(x: number, y: number) {
            const rect = htmlElement.getBoundingClientRect()
            const dx = -(rect.left + rect.right) / 2 + x
            const dy = (rect.top + rect.bottom) / 2 - y
            const angle = (180 * Math.atan2(dy, dx)) / Math.PI
            const angleGeo = Math.floor((450 - angle) % 360)
            self.value.setData("" + angleGeo)
        }

        htmlElement.ontouchmove = (ev: TouchEvent) => {
            onPosChange(ev.touches[0].clientX, ev.touches[0].clientY)
            ev.preventDefault()
        }

        htmlElement.ontouchstart = (ev: TouchEvent) => {
            onPosChange(ev.touches[0].clientX, ev.touches[0].clientY)
        }

        let isDown = false

        htmlElement.onmousedown = (ev: MouseEvent) => {
            isDown = true
            onPosChange(ev.clientX, ev.clientY)
            ev.preventDefault()
        }

        htmlElement.onmouseup = (ev) => {
            isDown = false
            ev.preventDefault()
        }

        htmlElement.onmousemove = (ev: MouseEvent) => {
            if (isDown) {
                onPosChange(ev.clientX, ev.clientY)
            }
            ev.preventDefault()
        }
    }
}
