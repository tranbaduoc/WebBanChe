/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/* globals console, window, document */

import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document/src/ckeditor';
import { CS_CONFIG } from '@ckeditor/ckeditor5-cloud-services/tests/_utils/cloud-services-config';

DecoupledEditor
	.create( document.querySelector( '.document-editor__editable' ), {
		cloudServices: CS_CONFIG
	} )
	.then( editor => {
		const toolbarContainer = document.querySelector( '.document-editor__toolbar' );

		toolbarContainer.appendChild( editor.ui.view.toolbar.element );

		window.editor = editor;
	} )
	.catch( err => {
		console.error( err );
	} );
