// @flow
import {MainModel, Model} from "../libs/confy/models"
import {OptionField} from "../libs/confy/fields/options/optionField"
import {TextField} from "../libs/confy/fields/text/textField"
import {BoolField} from "../libs/confy/fields/switch/boolField"
import {ImageMultiChooserField} from "../libs/confy/fields/multiOptions/multiOptionField"
import {IntegerField} from "../libs/confy/fields/integer/IntegerField"
import {createTableForModel} from "../db/db"
import {ObjectField} from "../libs/confy/fields/object/ObjectField"
import {ArrayField} from "../libs/confy/fields/array/ArrayField"
import * as R from "ramda"
import {ImagePickerField} from "../libs/confy/fields/imagePicker/ImagePickerField"

export const WordModel = Model("words", {
    name: TextField("Slowo"),
    tags: TextField("Kategorie"),
    images: ImagePickerField("Obrazy")
})

const getSibling = (config, path, name) =>
    R.compose(
        R.view,
        R.lensPath,
        R.append(name),
        R.dropLast(1)
    )(path)(config)

export const ConfigurationModel = MainModel({
    someText: TextField("Some text"),
    someOptionField: OptionField("Some option", {
        options: [
            "option1",
            "option2"
        ]
    }),
    materials: ArrayField("Materiały",
        ObjectField("Some complex field", {
            someOptions: ImageMultiChooserField("Wybierz obrazki dla słowa", {
                options: [],
                def: ["https://images-na.ssl-images-amazon.com/images/I/81ep8rBNqFL._SX466_.jpg", "https://i.ytimg.com/vi/-CKvt1KNU74/maxresdefault.jpg",
                    "http://static.boredpanda.com/blog/wp-content/uploads/2017/02/goth-black-chicken-ayam-cemani-21.jpg"]
            }),
            someDynamicOptions: ImageMultiChooserField("Wybierz obrazki dynamic!", {}, (config, path) => ({
                options: getSibling(config, path, 'someOptions')
            }))
        }, {hidden: ['someOptions']})
    ),
    wordImages: ImageMultiChooserField("Wybierz obrazki dla słowa", {
        options: [
            "https://images-na.ssl-images-amazon.com/images/I/81ep8rBNqFL._SX466_.jpg",
            "https://s-media-cache-ak0.pinimg.com/236x/61/ac/e2/61ace20ff0969cfa19e1082f047feec3--realistic-dolls-vintage-dolls.jpg",
            "https://truimg.toysrus.com/product/images/09FF80A7.zoom.jpg?fit=inside|356:368",
            "https://i.ytimg.com/vi/-CKvt1KNU74/maxresdefault.jpg",
            "http://dreamatico.com/data_images/chicken/chicken-4.jpg",
            "http://static.boredpanda.com/blog/wp-content/uploads/2017/02/goth-black-chicken-ayam-cemani-21.jpg"
        ],
        def: []
    }),
    commandText: TextField("Wybierz polecenie dla kroku"),
    repetitionsNumber: IntegerField("Liczba prób dla słowa", {def: 3, min: 1}),
    picturesNumber: IntegerField("Wybierz ilość wyświetlanych obrazków", {def: 3, min: 1, max: 6}),
    showPicturesLabels: BoolField("Pokazuj podpisy pod obrazkami", {def: true}),
    readCommand: BoolField("Czytaj komende", {def: true})
})

// export const ConfigurationModel = Model({
//     materials: ArrayField(ObjectField({
//         word: ForeignField(WordModel, Select({
//             name: TextField({readonly: true}),
//             images: MultiOptionField()
//         })),
//         isInLearningMode: BoolField(),
//         isInTestingMode: BoolField()
//     })),
//     hintType: OptionField([
//         "Wyszarz",
//         "TAK",
//         "Powieksz",
//         "Brak"
//     ]),
//     commandText: OptionField([
//         "Pokaz gdzie jest {slowo}",
//         "{slowo}",
//     ]),
//     picturesNumber: IntegerField(1, 6),
//     isTextForPicture: BoolField(),
//     isReadingCommands: BoolField(),
//     showHintAfter: IntegerField(1, 20),
//     numberOfRepetitions: IntegerField(1, 20),
//     textRewards: MultiOptionField([
//         "Super",
//         "TAK",
//         "SWIETNIE"
//     ]),
//     isReadingRewards: BoolField(),
//     animationRewards: MultiImageOptionField([
//         "image/path"
//     ]),
//     testConfig: ObjectField({
//         numberOfRepetitions: IntegerField(1, 20),
//         timeForAnswer: IntegerField(1, 10)
//     })
// })

// const LinesConfigurationModel = Model({
//     materials: ArrayField(ObjectField({
//         shape: OptionField([
//             'Linia prosta',
//             'Linia ukosna',
//             'Kolo'
//         ]),
//         shapeColor: MultiColorField(colors),
//         trailColor: MultiColorField(colors),
//         size: MultiSizeField(sizes)
//     })),
//     materialRepets: IntegerField(1, 20),
//     isStartingPoint: BoolField(),
//     textRewards: MultiOptionField([
//         "Super",
//         "TAK",
//         "SWIETNIE"
//     ]),
//     isReadingRewards: BoolField(),
//     animationRewards: MultiImageOptionField([
//         "image/path"
//     ]),
//     testMaterialRepeats: IntegerField(1,20)
// })