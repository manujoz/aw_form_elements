interface AwInput extends HTMLElement {
	inputElement: HTMLInputElement;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void
}

declare var AwInput: {
	prototype: AwInput,
	new(): AwInput
}

interface AwSelect extends HTMLElement {
	inputElement: HTMLInputElement;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	reload
	 * 
	 * Refresca los options dentro del componente si cambiaron en el aw-select
	 */
	reload() : void;
}

declare var AwSelect: {
	prototype: AwSelect,
	new(): AwSelect
}

interface AwInputColor extends HTMLElement {
	inputElement: HTMLInputElement;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;
}

declare var AwInputColor: {
	prototype: AwInputColor,
	new(): AwInputColor
}

interface AwSelectSearch extends HTMLElement {
	inputElement: HTMLInputElement;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	reload
	 * 
	 * Refresca los options dentro del componente si cambiaron en el aw-select
	 */
	reload() : void;
}

declare var AwSelectSearch: {
	prototype: AwSelectSearch,
	new(): AwSelectSearch
}

interface AwInputDate extends HTMLElement {
	inputElement: HTMLInputElement;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void
}

declare var AwInputDate: {
	prototype: AwInputDate,
	new(): AwInputDate
}

interface AwInputFile extends HTMLElement {
	inputElement: HTMLInputElement;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method	get_files
	 * 
	 * Obtiene los archivos cargados en el input
	 */
	get_files() : FileList

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void
}

declare var AwInputFile: {
	prototype: AwInputFile,
	new(): AwInputFile
}

interface AwTextArea extends HTMLElement {
	inputElement: HTMLInputElement;

	/**
	 * @method error_hide
	 * 
	 * Muestra u oculta un mensaje de error
	 */
	error_hide() : void;

	/**
	 * @method error_show
	 * 
	 * Muestra u oculta un mensaje de error
	 * 
	 * @param {string} message Mensaje de error que se va a mostrar
	 */
	error_show( message: string ) : void;

	/**
	 * @method get_value
	 * 
	 * Obtiene el valor del input
	 * 
	 * @return {string}
	 */
	get_value() : string;

	/**
	 * @method	has_error
	 * 
	 * Devuelve si el campo tiene un error
	 * 
	 * @return {boolean}
	 */
	has_error() : boolean;

	/**
	 * @method	focus
	 * 
	 * Pone el foco sobre el input.
	 */
	focus() : void
}

declare var AwTextArea: {
	prototype: AwTextArea,
	new(): AwTextArea
}

interface HTMLElementTagNameMap {
	"aw-input": AwInput;
	"aw-input-df": AwInput;
	"aw-select": AwSelect;
	"aw-select-df": AwSelect;
	"aw-select-search": AwSelectSearch;
	"aw-select-search-df": AwSelectSearch;
	"aw-input-color": AwInputColor;
	"aw-input-color-df": AwInputColor;
	"aw-input-date": AwInputDate;
	"aw-input-date-df": AwInputDate;
	"aw-input-file": AwInputFile;
	"aw-input-file-df": AwInputFile;
	"aw-textarea": AwTextArea;
	"aw-textarea-df": AwTextArea;
}