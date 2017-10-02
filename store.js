import {types, process} from 'mobx-state-tree';

const Speaker = types.model('Speaker', {
  id: types.identifier(),
  name: '',
  role: '',
  description: '',
  img: types.maybe(types.string),
});

const Store = types
  .model('Store', {
    allSpeakers: types.optional(types.array(Speaker), []),
    speaker: types.maybe(types.reference(Speaker)),
    searchTerm: '',
    loading: false,
  })
  .views(self => ({
    get speakers() {
      return self.allSpeakers.filter(s => s.name.includes(self.searchTerm));
    },
  }))
  .actions(self => {
    const loadSpeakers = process(function* loadSpeakers() {
      self.loading = true;
      const result = yield fetch('http://127.0.0.1:8080/speakers.json');
      const speakers = yield result.json();
      self.allSpeakers = speakers;
      self.loading = false;
    });
    return {
      afterCreate() {
        self.loadSpeakers();
      },
      search(term) {
        self.searchTerm = term;
      },
      setSpeaker(speaker) {
        self.speaker = speaker;
      },
      loadSpeakers,
    };
  });

const store = Store.create();

export default store;
