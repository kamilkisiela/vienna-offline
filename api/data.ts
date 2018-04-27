interface Note {
  id: string;
  title: string;
  text: string;
}

interface NoteInput {
  title: string;
  text: string;
}

class SimpleMap<T> extends Map<string, T> {
  order: string[] = [];

  set(id: string, val: T): this {
    super.set(id, val);

    this.order = this.order.filter(oid => oid !== id);
    this.order.unshift(id);

    return this;
  }

  get(id: string): T {
    return super.get(id);
  }

  delete(id: string) {
    this.order.filter(oid => oid !== id);
    return super.delete(id);
  }

  all(): T[] {
    return this.order.map(id => this.get(id));
  }
}

const notes = new SimpleMap<Note>();

const genID = () =>
  Math.random()
    .toString(36)
    .substr(2);

export const all = (): Note[] => notes.all();
export const single = (id: string): Note => notes.get(id);
export const add = (input: NoteInput) => {
  const note = {
    id: genID(),
    ...input,
  };

  notes.set(note.id, note);

  return note;
};
export const remove = (id: string): Note => {
  const note = notes.get(id);

  notes.delete(id);

  return note;
};
export const update = (id: string, input: NoteInput): Note => {
  const note = notes.get(id);

  const updated = {
    ...note,
    ...input,
  };

  notes.set(id, updated);

  return updated;
};
