
class Board {
    
    private _boardID: number = 0
    private _imageURL: string = ""
    private _elements: element[] = []


    public get boardID(): number {
        return this._boardID
    }
    
    public set boardID(value: number) {
        this._boardID = value
    }

    public get imageURL(): string {
        return this._imageURL
    }

    public set imageURL(value: string) {
        this._imageURL = value
    }

    public get elements(): element[] {
        return this._elements
    }

    public set elements(value: element[]) {
        this._elements = value
    }

    public addToElements(element : element){

    }

    



}