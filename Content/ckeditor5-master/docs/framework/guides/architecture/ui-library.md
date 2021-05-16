---
category: framework-architecture
order: 40
---

# UI library

The standard UI library of CKEditor 5 is [`@ckeditor/ckeditor5-ui`](https://www.npmjs.com/package/@ckeditor/ckeditor5-ui). It provides base classes and helpers that allow for building a modular UI that seamlessly integrates with other components of the ecosystem.

## Views

Views use [templates](#templates) to build the UI. They also provide observable interfaces that other features (e.g. {@link framework/guides/architecture/core-editor-architecture#plugins plugins}, {@link framework/guides/architecture/core-editor-architecture#commands commands}, etc.) can use to change the DOM without any actual interaction with the native API.

### Definition

A simple input view class can be defined as follows:

```js
class SampleInputView extends View {
	constructor( locale ) {
		super( locale );

		// An entry point to binding observables with DOM attributes,
		// events and text nodes.
		const bind = this.bindTemplate;

		// Views define their interface (state) using observable properties.
		this.set( {
			isEnabled: false,
			placeholder: ''
		} );

		this.setTemplate( {
			tag: 'input',
			attributes: {
				class: [
					'foo',
					// The value of view#isEnabled will control the presence
					// of the class.
					bind.if( 'isEnabled', 'ck-enabled' ),
				],

				// The HTML "placeholder" attribute is also controlled by the observable.
				placeholder: bind.to( 'placeholder' ),
				type: 'text'
			},
			on: {
				// DOM keydown events will fire the view#input event.
				keydown: bind.to( 'input' )
			}
		} );
	}

	setValue( newValue ) {
		this.element.value = newValue;
	}
}
```

Note that views encapsulate the DOM they render. Because the UI is organized according to the *view-per-tree* rule, it is clear which view is responsible for which part of the UI so it is unlikely that a collision occurs between two features writing to the same DOM node.

More often than not, views become children of other views (collections), nodes in the [UI view tree](#view-collections-and-the-ui-tree):

```js
class ParentView extends View {
	constructor( locale ) {
		super( locale );

		const childA = new SampleInputView( locale );
		const childB = new SampleInputView( locale );

		this.setTemplate( {
			tag: 'div',
			children: [
				childA,
				childB
			]
		} );
	}
}

const parent = new ParentView( locale );

parent.render();

// Will insert <div><input .. /><input .. /></div>.
document.body.appendChild( parent.element );
```

It is also possible to create standalone views that do not belong to any collection. They must be {@link module:ui/view~View#render rendered} before injection into the DOM:

```js
const view = new SampleInputView( locale );

view.render();

// Will insert <input class="foo" type="text" placeholder="" />
document.body.appendChild( view.element );
```

### Interaction

Features can interact with the state of the DOM via the observable properties of the view, so the following:

```js
view.isEnabled = true;
view.placeholder = 'Type some text';
```

will result in:

```html
<input class="foo ck-enabled" type="text" placeholder="Type some text" />
```

Alternatively, they can [bind](#event-system-and-observables) them directly to their own observable properties:

```js
view.bind( 'placeholder', 'isEnabled' ).to( observable, 'placeholderText', 'isEnabled' );

// The following will be automatically reflected in the view#placeholder and
// view.element#placeholder HTML attribute in the DOM.
observable.placeholderText = 'Some placeholder';
```

Also, since views propagate DOM events, features can now react to the user actions:

```js
// Each "keydown" event in the input will execute a command.
view.on( 'input', () => {
	editor.execute( 'myCommand' );
} );
```

### Best practices

A complete view should provide an interface for the features, encapsulating DOM nodes and attributes. Features should not touch the DOM of the view using the native API. Any kind of interaction must be handled by the view that owns an {@link module:ui/view~View#element} to avoid collisions:

```js
// Will change the value of the input.
view.setValue( 'A new value of the input.' );

// WRONG! This is **NOT** the right way to interact with the DOM because it
// collides with an observable binding to the #placeholderText. The value will
// be permanently overridden when the state of the observable changes.
view.element.placeholder = 'A new placeholder';
```

## Templates

{@link module:ui/template~Template Templates} render DOM elements and text nodes in the UI library. Used primarily by [views](#views), they are the lowest layer of the UI connecting the application to the web page.

<info-box>
	Check out the {@link module:ui/template~TemplateDefinition} to learn more about the template syntax and other advanced concepts.
</info-box>

Templates support [observable properties](#event-system-and-observables) bindings and handle native DOM events. A very simple template can look like this:

```js
new Template( {
	tag: 'p',
	attributes: {
		class: [
			'foo',
			bind.to( 'className' )
		],
		style: {
			backgroundColor: 'yellow'
		}
	},
	on: {
		click: bind.to( 'clicked' )
	},
	children: [
		'A paragraph.'
	]
} ).render();
```

It renders to an HTML element:

```html
<p class="foo bar" style="background-color: yellow;">A paragraph.</p>
```

where `observable#className` is `"bar"`. The `observable` in the example above can be a [view](#views) or any object which is {@link module:utils/observablemixin~Observable observable}. When the value of the `className` attribute changes, the template updates the `class` attribute in the DOM. From now on the element is permanently bound to the state of the application.

Similarly, when rendered, the template also takes care of DOM events. A binding to the `click` event in the definition makes the `observable` always fire the `clicked` event upon an action in the DOM. This way the `observable` provides an event interface of the DOM element and all the communication should pass through it.

## View collections and the UI tree

Views are organized into {@link module:ui/viewcollection~ViewCollection collections} which manage their elements and propagate DOM events even further. Adding or removing a view in a collection moves the {@link module:ui/view~View#element view's element} in the DOM to reflect the position.

Each editor UI has a {@link module:core/editor/editorui~EditorUI#view root view}, which can be found under `editor.ui.view`. Such view usually defines the container element of the editor and undermost view collections that other features can populate.

For instance, the `BoxedEditorUiView` class defines two collections:
* {@link module:ui/editorui/boxed/boxededitoruiview~BoxedEditorUIView#top} &ndash; A collection that hosts the toolbar.
* {@link module:ui/editorui/boxed/boxededitoruiview~BoxedEditorUIView#main} &ndash; A collection that contains the editable area of the editor.

It also inherits the {@link module:ui/editorui/editoruiview~EditorUIView#body} collection which resides directly in the `<body>` of the web page and stores floating elements like {@link module:ui/panel/balloon/balloonpanelview~BalloonPanelView balloon panels}.

Plugins can populate the root view collections with their children. Such child views become a part of the UI tree and will be managed by the editor, e.g. they will be initialized and destroyed along with the editor.

```js
class MyPlugin extends Plugin {
	init() {
		const editor = this.editor;
		const view = new MyPluginView();

		editor.ui.top.add( view );
	}
}
```

`MyPluginView` can {@link module:ui/view~View#createCollection create its own view collections} and populate them during the life cycle of the editor. There is no limit to the depth of the UI tree, which usually looks like this:

```
EditorUIView
	├── "top" collection
	│	└── ToolbarView
	│		└── "items" collection
	│			├── DropdownView
	│			│	├── ButtonView
	│			│	└── PanelView
	│			├── ButtonViewA
	│			├── ButtonViewB
	│			└── ...
	├── "main" collection
	│	└── InlineEditableUIView
	└── "body" collection
		 ├── BalloonPanelView
		 │	└── "content" collection
		 │		└── ToolbarView
		 ├── BalloonPanelView
		 │	└── "content" collection
		 │		└── ...
		 └── ...
```

## Using the existing components

The framework provides a number of common {@link api/ui components} like {@link module:ui/button/buttonview~ButtonView `ButtonView`} or {@link module:ui/toolbar/toolbarview~ToolbarView `ToolbarView`} that can be helpful when developing a new user interface.

For example, to create a toolbar with a few buttons inside, `ToolbarView` and `ButtonView` classes need to be imported first:

```js
import ToolbarView from '@ckeditor/ckeditor5-ui/src/toolbar/toolbarview';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
```

Create the toolbar and a couple of buttons with labels first. Then append the buttons to the toolbar:

```js
const toolbar = new ToolbarView();
const buttonFoo = new ButtonView();
const buttonBar = new ButtonView();

buttonFoo.set( {
	label: 'Foo',
	withText: true
} );

buttonBar.set( {
	label: 'Bar',
	withText: true
} );

toolbar.items.add( buttonFoo );
toolbar.items.add( buttonBar );
```

The toolbar can now join the [UI tree](#view-collections-and-the-ui-tree) or it can be injected straight into the DOM. To keep the example simple, proceed with the latter scenario:

```js
toolbar.render();

document.body.appendChild( toolbar.element );
```

The result should look like this:

{@img assets/img/framework-architecture-toolbar.png 636 A simple toolbar created using existing components.}

The toolbar renders correctly but it does not do much. To execute an action when the button is clicked, a listener must be defined. To shorten the code and instead of two listeners define just one, the buttons can {@link module:utils/emittermixin~EmitterMixin#delegate delegate} the {@link module:ui/button/buttonview~ButtonView#execute `execute`} event to their parent:

```js
buttonFoo.delegate( 'execute' ).to( toolbar );
buttonBar.delegate( 'execute' ).to( toolbar );

toolbar.on( 'execute', evt => {
	console.log( `The "${ evt.source.label }" button was clicked!` );
} );
```

### Dropdowns

The framework implements the {@link module:ui/dropdown/dropdownview~DropdownView dropdown} component which can host any sort of UI in its panel. It is composed of a {@link module:ui/dropdown/dropdownview~DropdownView#buttonView button} (to open the dropdown) and a {@link module:ui/dropdown/dropdownview~DropdownView#panelView panel} (the container).

The button can be either:
* a standard {@link module:ui/button/buttonview~ButtonView},
* a {@link module:ui/dropdown/button/splitbuttonview~SplitButtonView}, for more complex use cases.

The dropdown panel exposes its {@link module:ui/dropdown/dropdownpanelview~DropdownPanelView#children children} collection which aggregates the child {@link module:ui/view~View views}. The most common views displayed in the dropdown panel are:
* {@link module:ui/list/listview~ListView}
* {@link module:ui/toolbar/toolbarview~ToolbarView}

The framework provides a set of helpers to make the dropdown creation process easier, although it is still possible to compose a custom dropdown from scratch using the base classes.

The {@link module:ui/dropdown/utils#createDropdown} helper creates a {@link module:ui/dropdown/dropdownview~DropdownView} with either a {@link module:ui/button/buttonview~ButtonView} or a {@link module:ui/dropdown/button/splitbuttonview~SplitButtonView}.

```js
import { createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview';

const dropdownView = createDropdown( locale, SplitButtonView );
```

This kind of (default) dropdown comes with a set of behaviors:
* It closes the panel when it loses the focus, e.g. the user moved the focus elsewhere.
* It closes the panel upon the {@link module:ui/dropdown/dropdownview~DropdownView#execute `execute`} event.
* It focuses the view hosted in the panel, e.g. when navigating the toolbar using the keyboard.

#### Adding a list to a dropdown

The {@link module:ui/list/listview~ListView} can be added to a dropdown using the {@link module:ui/dropdown/utils#addListToDropdown} helper.

```js
import Model from '@ckeditor/ckeditor5-ui/src/model';
import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

// The default dropdown.
const dropdownView = createDropdown( locale );

// The collection of the list items.
const items = new Collection();

items.add( new Model( { label: 'Foo' } ) );
items.add( new Model( { label: 'Bar' } ) );

// Create a dropdown with a list inside the panel.
addListToDropdown( dropdownView, items );
```

#### Adding a toolbar to a dropdown

A {@link module:ui/toolbar/toolbarview~ToolbarView} can be added to a dropdown using  the {@link module:ui/dropdown/utils#addToolbarToDropdown} helper.

```js
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { addToolbarToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';
import SplitButtonView from '@ckeditor/ckeditor5-ui/src/dropdown/button/splitbuttonview';

const buttons = [];

// Add a simple button to the array of toolbar items.
buttons.push( new ButtonView() );

// Add another component to the array of toolbar items.
buttons.push( componentFactory.create( 'componentName' ) );

const dropdownView = createDropdown( locale, SplitButtonView );

// Create a dropdown with a toolbar inside the panel.
addToolbarToDropdown( dropdownView, buttons );
```

A common practice is making the main dropdown button {@link module:ui/dropdown/dropdownview~DropdownView#isEnabled enabled} when one of the toolbar items is enabled:

```js
// Enable the dropdown's button when any of the toolbar items is enabled.
dropdownView.bind( 'isEnabled' ).toMany( buttons, 'isEnabled',
	( ...areEnabled ) => areEnabled.some( isEnabled => isEnabled )
);
```

### Best practices

It is advised that for the best user experience the editing view gets {@link module:engine/view/view~View#focus focused} upon any user action (e.g. executing a command) to make sure the editor retains focus:

```js
// Execute some action on dropdown#execute event.
dropdownView.buttonView.on( 'execute', () => {
	editor.execute( 'command', { value: ... } );
	editor.editing.view.focus();
} );
```

## Keystrokes and focus management

_Coming soon..._

The framework offers built–in classes that help manage keystrokes and focus in the UI. They are particularly useful when it comes to bringing accessibility features to the application.

### Focus tracker

The {@link module:utils/focustracker~FocusTracker `FocusTracker`} class can observe a number of HTML elements and determine if one of them is focused either by the user (clicking, typing) or using the `HTMLElement.focus()` DOM method.

```js
import FocusTracker from '@ckeditor/ckeditor5-utils/src/focustracker';

// ...

const focusTracker = new FocusTracker();
```

To register elements in the tracker, use the {@link module:utils/focustracker~FocusTracker#add `add()`} method:

```js
focusTracker.add( document.querySelector( '.some-element' ) );
focusTracker.add( viewInstance.element );
```

Observing focus tracker's {@link module:utils/focustracker~FocusTracker#isFocused `isFocused`} observable property allows to determine whether one of the registered elements is currently focused:

```js
focusTracker.on( 'change:isFocused', ( evt, name, isFocused ) => {
	if ( isFocused ) {
		console.log( 'The', focusTracker.focusedElement, 'is focused now.' );
	} else {
		console.log( 'The elements are blurred.' );
	}
} );
```

This information is useful when implementing a certain type of UI whose behavior depends on the focus, for example, contextual panels and floating balloons containing forms should hide when the user decides to abandon them.

### Keystroke handler

The {@link module:utils/keystrokehandler~KeystrokeHandler `KeystrokeHandler`} listens to the keystroke events fired by an HTML element or any of its descendants and executes pre–defined actions when the keystroke is pressed. Usually, each [view](#views) creates its own keystroke handler instance which takes care of the keystrokes fired by the elements the view has rendered.

```js
import KeystrokeHandler from '@ckeditor/ckeditor5-utils/src/keystrokehandler';

// ...

const keystrokeHandler = new KeystrokeHandler();
```

To define the scope of the keystroke handler in the DOM, use the {@link module:utils/keystrokehandler~KeystrokeHandler#listenTo `listenTo()`} method:

```js
keystrokeHandler.listenTo( document.querySelector( '.some-element' ) );
keystrokeHandler.listenTo( viewInstance.element );
```

<info-box>
	Check out the list of {@link module:utils/keyboard#keyCodes known key names} supported by the keystroke handler.
</info-box>

Keystroke action callbacks are functions. To prevent the default action of the keystroke and stop further propagation, use the `cancel()` function provided in the callback.

```js
keystrokeHandler.set( 'Tab', ( keyEvtData, cancel ) => {
	console.log( 'Tab was pressed!' );

	// This keystroke has been handled and can be canceled.
	cancel();
} );
```

<info-box>
	There is also an {@link module:core/editingkeystrokehandler~EditingKeystrokeHandler `EditingKeystrokeHandler`} class which has the same API as `KeystrokeHandler` but it offers direct keystroke bindings to editor commands.

	The editor provides such keystroke handler under the {@link module:core/editor/editor~Editor#keystrokes `editor.keystrokes`} property so any plugin can register keystrokes associated with editor commands. For example, the {@link module:undo/undo~Undo Undo} plugin registers `editor.keystrokes.set( 'Ctrl+Z', 'undo' );` to execute its `undo` command.
</info-box>

When multiple callbacks are assigned to the same keystroke, priorities can be used to decide which one should be handled first and whether other callbacks should be executed at all:

```js
keystrokeHandler.set( 'Ctrl+A', ( keyEvtData ) => {
	console.log( 'A normal priority listener.' );
} );

keystrokeHandler.set( 'Ctrl+A', ( keyEvtData ) => {
	console.log( 'A high priority listener.' );

	// The normal priority listener will not be executed.
	cancel();
}, { priority: 'high' } );
```

Pressing <kbd>Ctrl</kbd>+<kbd>A</kbd> will only log:

```
"A high priority listener."
```
