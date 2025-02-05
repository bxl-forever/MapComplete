import Combine from "../Base/Combine"
import { Store, UIEventSource } from "../../Logic/UIEventSource"
import { BBox } from "../../Logic/BBox"
import UserRelatedState from "../../Logic/State/UserRelatedState"
import Translations from "../i18n/Translations"
import Constants from "../../Models/Constants"
import { DropDown } from "../Input/DropDown"
import { Utils } from "../../Utils"
import LayerConfig from "../../Models/ThemeConfig/LayerConfig"
import BaseLayer from "../../Models/BaseLayer"
import AvailableBaseLayers from "../../Logic/Actors/AvailableBaseLayers"
import Loc from "../../Models/Loc"
import Minimap from "../Base/Minimap"
import Attribution from "../BigComponents/Attribution"
import StaticFeatureSource from "../../Logic/FeatureSource/Sources/StaticFeatureSource"
import Toggle from "../Input/Toggle"
import { VariableUiElement } from "../Base/VariableUIElement"
import { FixedUiElement } from "../Base/FixedUiElement"
import { FlowStep } from "./FlowStep"
import ScrollableFullScreen from "../Base/ScrollableFullScreen"
import Title from "../Base/Title"
import CheckBoxes from "../Input/Checkboxes"
import AllTagsPanel from "../AllTagsPanel.svelte"
import BackgroundMapSwitch from "../BigComponents/BackgroundMapSwitch"
import { Feature, Point } from "geojson"
import DivContainer from "../Base/DivContainer"
import ShowDataLayer from "../ShowDataLayer/ShowDataLayer"
import SvelteUIElement from "../Base/SvelteUIElement"
import { AllSharedLayers } from "../../Customizations/AllSharedLayers"

class PreviewPanel extends ScrollableFullScreen {
    constructor(tags: UIEventSource<any>) {
        super(
            (_) => new FixedUiElement("Element to import"),
            (_) =>
                new Combine([
                    "The tags are:",
                    new SvelteUIElement(AllTagsPanel, { tags }),
                ]).SetClass("flex flex-col"),
            "element"
        )
    }
}

/**
 * Shows the data to import on a map, asks for the correct layer to be selected
 */
export class MapPreview
    extends Combine
    implements FlowStep<{ bbox: BBox; layer: LayerConfig; features: Feature<Point>[] }>
{
    public readonly IsValid: Store<boolean>
    public readonly Value: Store<{ bbox: BBox; layer: LayerConfig; features: any[] }>

    constructor(state: UserRelatedState, geojson: { features: Feature[] }) {
        const t = Translations.t.importHelper.mapPreview

        const propertyKeys = new Set<string>()
        for (const f of geojson.features) {
            Object.keys(f.properties).forEach((key) => propertyKeys.add(key))
        }

        const availableLayers = AllSharedLayers.AllPublicLayers().filter(
            (l) => l.name !== undefined && Constants.priviliged_layers.indexOf(l.id) < 0
        )
        const layerPicker = new DropDown(
            t.selectLayer,
            [{ shown: t.selectLayer, value: undefined }].concat(
                availableLayers.map((l) => ({
                    shown: l.name,
                    value: l,
                }))
            )
        )

        let autodetected = new UIEventSource(false)
        for (const layer of availableLayers) {
            const mismatched = geojson.features.some(
                (f) => !layer.source.osmTags.matchesProperties(f.properties)
            )
            if (!mismatched) {
                console.log("Autodected layer", layer.id)
                layerPicker.GetValue().setData(layer)
                layerPicker.GetValue().addCallback((_) => autodetected.setData(false))
                autodetected.setData(true)
                break
            }
        }

        const withId = geojson.features.map((f, i) => {
            const copy = Utils.Clone(f)
            copy.properties.id = "to-import/" + i
            return copy
        })

        // Create a store which has only features matching the selected layer
        const matching: Store<Feature[]> = layerPicker.GetValue().map((layer: LayerConfig) => {
            if (layer === undefined) {
                console.log("No matching layer found")
                return []
            }
            const matching: Feature[] = []

            for (const feature of withId) {
                if (layer.source.osmTags.matchesProperties(feature.properties)) {
                    matching.push(feature)
                }
            }
            console.log("Matching features: ", matching)

            return matching
        })
        const background = new UIEventSource<BaseLayer>(AvailableBaseLayers.osmCarto)
        const location = new UIEventSource<Loc>({ lat: 0, lon: 0, zoom: 1 })
        const currentBounds = new UIEventSource<BBox>(undefined)
        const map = Minimap.createMiniMap({
            allowMoving: true,
            location,
            background,
            bounds: currentBounds,
            attribution: new Attribution(
                location,
                state.osmConnection.userDetails,
                undefined,
                currentBounds
            ),
        })
        const layerControl = new BackgroundMapSwitch(
            {
                backgroundLayer: background,
                locationControl: location,
            },
            background
        )
        map.SetClass("w-full").SetStyle("height: 500px")

        layerPicker.GetValue().addCallbackAndRunD((layerToShow) => {
            new ShowDataLayer({
                layerToShow,
                zoomToFeatures: true,
                features: StaticFeatureSource.fromDateless(
                    matching.map((features) => features.map((feature) => ({ feature })))
                ),
                leafletMap: map.leafletMap,
                popup: (tag) => new PreviewPanel(tag),
            })
        })

        const bbox = matching.map((feats) =>
            BBox.bboxAroundAll(
                feats.map((f) => new BBox([(<Feature<Point>>f).geometry.coordinates]))
            )
        )

        const mismatchIndicator = new VariableUiElement(
            matching.map((matching) => {
                if (matching === undefined) {
                    return undefined
                }
                const diff = geojson.features.length - matching.length
                if (diff === 0) {
                    return undefined
                }
                const obligatory = layerPicker
                    .GetValue()
                    .data?.source?.osmTags?.asHumanString(false, false, {})
                return t.mismatch.Subs({ count: diff, tags: obligatory }).SetClass("alert")
            })
        )

        const confirm = new CheckBoxes([t.confirm])
        super([
            new Title(t.title, 1),
            layerPicker,
            new Toggle(t.autodetected.SetClass("thanks"), undefined, autodetected),

            mismatchIndicator,
            map,
            new DivContainer("fullscreen"),
            layerControl,
            confirm,
        ])

        this.Value = bbox.map(
            (bbox) => ({
                bbox,
                features: matching.data,
                layer: layerPicker.GetValue().data,
            }),
            [layerPicker.GetValue(), matching]
        )

        this.IsValid = matching.map(
            (matching) => {
                if (matching === undefined) {
                    return false
                }
                if (confirm.GetValue().data.length !== 1) {
                    return false
                }
                const diff = geojson.features.length - matching.length
                return diff === 0
            },
            [confirm.GetValue()]
        )
    }
}
