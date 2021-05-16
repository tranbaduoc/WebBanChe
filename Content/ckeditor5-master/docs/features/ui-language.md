---
category: features
---

# Setting the UI language

The UI of the editor can be localized. CKEditor 5 currently supports around 20 languages and the number is growing.

If you want to help translate CKEditor 5 into your native language, join the [CKEditor 5 project on Transifex](https://www.transifex.com/ckeditor/ckeditor5/). Your help will be much appreciated!

See the demo of the editor in German:

{@snippet features/ui-language}

## Loading additional languages from CDN, npm and zip file

 By default, the editor will display in English. This is the language built into the `ckeditor.js` files. In order to change the language of the editor UI, you need to load additional language file(s). Check out the following sections to see how to do that:

* [CDN](#cdn),
* [npm](#npm),
* [Zip download](#zip).

Next, you can configure the editor to use the chosen language:

```js
ClassicEditor
	.create( document.querySelector( '#editor' ), {
		// The language code is defined in the https://en.wikipedia.org/wiki/ISO_639-1 standard.
		language: 'de'
	} )
	.then( editor => {
		console.log( editor );
	} )
	.catch( error => {
		console.error( error );
	} );
```

### CDN

To use different language than default one (English), you need to load the editor together with the preferred language:

```html
<script src="https://cdn.ckeditor.com/ckeditor5/[version.number]/[distribution]/ckeditor.js"></script>
<script src="https://cdn.ckeditor.com/ckeditor5/[version.number]/[distribution]/translations/[lang].js"></script>
```

For example:

```html
<script src="https://cdn.ckeditor.com/ckeditor5/{@var ckeditor5-version}/classic/ckeditor.js"></script>
<script src="https://cdn.ckeditor.com/ckeditor5/{@var ckeditor5-version}/classic/translations/de.js"></script>
```

See {@link builds/guides/integration/installation#cdn CDN installation guides} for more information.

### npm

After installing the build from npm, languages will be available at `node_modules/@ckeditor/ckeditor5-build-[name]/build/translations/[lang].js`.

Single language can be loaded directly to your code by importing e.g. `'@ckeditor/ckeditor5-build-classic/build/translations/de.js'`.

See {@link builds/guides/integration/installation#npm npm installation guides} for more information.

### Zip

All additional languages are included in the `.zip` file. You need to include `ckeditor.js` file together with the chosen language file:

```html
<script src="[ckeditor-path]/ckeditor.js"></script>
<script src="[ckeditor-path]/translations/de.js"></script>
```

See {@link builds/guides/integration/installation#zip-download zip installation guides} for more information.

## Building the editor using a specific language

Currently, it is possible to change the UI language at the build stage and after the build. A single build of the editor supports the language which was defined in the [CKEditor 5 webpack plugin](https://www.npmjs.com/package/@ckeditor/ckeditor5-dev-webpack-plugin)'s configuration. See the whole translation process to see how you can change the language later.

If you use one of the {@link builds/index predefined editor builds}, refer to {@link builds/guides/development/custom-builds Creating custom builds} to learn how to change the language of your build.

If you build CKEditor from scratch or integrate it directly into your application, then all you need to do is to:

1. Install the [`@ckeditor/ckeditor5-dev-webpack-plugin`](https://www.npmjs.com/package/@ckeditor/ckeditor5-dev-webpack-plugin) package:

	```bash
	npm install --save @ckeditor/ckeditor5-dev-webpack-plugin
	```

2. Add it to your webpack configuration:

	Note: The language code is defined in the [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) standard.

	```js
	const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );

	// Define webpack plugins ...
		plugins: [
			new CKEditorWebpackPlugin( {
				// Main language that will be built into the main bundle.
				language: 'en',

				// Additional languages that will be emitted to the `outputDirectory`.
				// This option can be set to an array of language codes or `'all'` to build all found languages.
				// The bundle is optimized for one language when this option is omitted.
				additionalLanguages: 'all',

				// Optional directory for emitted translations. Relative to the webpack's output.
				// Defaults to `'translations'`.
				// outputDirectory: 'ckeditor5-translations',

				// Whether the build process should fail if an error occurs.
				// Defaults to `false`.
				// strict: true,

				// Whether to log all warnings to the console.
				// Defaults to `false`.
				// verbose: true
			} ),

			// Other webpack plugins...
		]
	// ...
	```

3. Run webpack. If the `additionalLanguages` option is not set, the CKEditor plugin for webpack will replace the {@link module:utils/locale~Locale#t `t()`} function call parameters used in the source code with localized language strings. Otherwise the CKEditor plugin for webpack will replace the {@link module:utils/locale~Locale#t `t()`} function call parameters with short ids and emit the translation files that should land in the `'translations'` directory (or different, if the `outputDirectory` option is specified).

4. If you want to change the language after the build ends, you will need to edit the `index.html` file, add the translation file and set the UI language to the target one.

	```html
	<script src="../build/ckeditor.js"></script>
	<script src="../build/translations/pl.js"></script>
	<script>
		ClassicEditor
			.create( document.querySelector( '#editor' ), {
				language: 'pl'
			} )
			.then( editor => {
				window.editor = editor;
			} )
			.catch( err => {
				console.error( err.stack );
			} );
	</script>
	```

<info-box>
	We are aware that the current localization method is not sufficient for some needs. It does not support different bundlers (e.g. Rollup or Browserify). We will be extending the localization possibilities in the future.

	You can read more about the used techniques in the ["Implement translation services" issue](https://github.com/ckeditor/ckeditor5/issues/387) and ["Implement translation services v2" issue](https://github.com/ckeditor/ckeditor5/issues/624).
</info-box>
