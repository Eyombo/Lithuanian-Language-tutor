/* Linksniai — course data.
 * Verb lists come from "Spoken Lithuanian: Verb Case Government".
 * Sentence format: the governed word(s) sit in [form|nominative], e.g. "Noriu [vandens|vanduo]."
 * Row format: [verb, meaning, sentence, translation, lessonId, note?]
 */
window.LT_DATA = (() => {
  const CASES = {
    gen: { name: 'Genitive', lt: 'Kilmininkas', q: 'Ko?', qEn: 'of what / whom?',
      idea: 'wanting, needing, seeking, waiting, fearing, avoiding, lacking or losing. The object is reached for rather than acted on.' },
    dat: { name: 'Dative', lt: 'Naudininkas', q: 'Kam?', qEn: 'to / for whom?',
      idea: 'the person on the receiving end of help, speech, a gift, a feeling, permission or authority.' },
    acc: { name: 'Accusative', lt: 'Galininkas', q: 'Ką?', qEn: 'what / whom?',
      idea: 'the default direct object of a straightforward action: seeing, buying, reading, eating.' },
    ins: { name: 'Instrumental', lt: 'Įnagininkas', q: 'Kuo?', qEn: 'with / by / as what?',
      idea: 'interest, admiration, pride, trust, becoming something, a role, or the means of a state.' },
    loc: { name: 'Locative', lt: 'Vietininkas', q: 'Kur?', qEn: 'where?',
      idea: 'location or state, with no preposition. The ending does the work of English "in / at".' }
  };

  const ENDINGS = {
    head: ['Nominative', 'gen', 'dat', 'acc', 'ins', 'loc'],
    rows: [
      ['namas (house)', 'namo', 'namui', 'namą', 'namu', 'name'],
      ['brolis (brother)', 'brolio', 'broliui', 'brolį', 'broliu', 'brolyje'],
      ['kambarys (room)', 'kambario', 'kambariui', 'kambarį', 'kambariu', 'kambaryje'],
      ['sūnus (son)', 'sūnaus', 'sūnui', 'sūnų', 'sūnumi', 'sūnuje'],
      ['knyga (book)', 'knygos', 'knygai', 'knygą', 'knyga', 'knygoje'],
      ['upė (river)', 'upės', 'upei', 'upę', 'upe', 'upėje'],
      ['namai (home, pl.)', 'namų', 'namams', 'namus', 'namais', 'namuose'],
      ['knygos (books, pl.)', 'knygų', 'knygoms', 'knygas', 'knygomis', 'knygose']
    ]
  };

  const VERBS = {
    gen: [
      ['norėti', 'to want (some)', 'Noriu [vandens|vanduo].', 'I want (some) water.', 'l3'],
      ['reikėti', 'to need', 'Man reikia [pinigų|pinigai].', 'I need money.', 'l3', 'The person who needs goes in the Dative (man), the thing needed in the Genitive.'],
      ['ieškoti', 'to look for', 'Ieškau savo [rakto|raktas].', "I'm looking for my key.", 'l3'],
      ['laukti', 'to wait for', 'Laukiu [autobuso|autobusas].', "I'm waiting for the bus.", 'l3'],
      ['bijoti', 'to be afraid of', 'Vaikas bijo [šuns|šuo].', 'The child is afraid of the dog.', 'l3'],
      ['vengti', 'to avoid', 'Jis vengia [konfliktų|konfliktai].', 'He avoids conflicts.', 'l11'],
      ['gėdytis', 'to be ashamed of', 'Gėdijuosi savo [elgesio|elgesys].', "I'm ashamed of my behaviour.", 'l11'],
      ['klausytis', 'to listen to', 'Klausausi [muzikos|muzika].', "I'm listening to music.", 'l3'],
      ['klausyti', 'to obey', 'Vaikai turi klausyti [tėvų|tėvai].', 'Children must obey their parents.', 'l11', 'Without -s it means "obey"; klausytis (with -s) means "listen to".'],
      ['siekti', 'to strive for / pursue', 'Ji siekia savo [tikslo|tikslas].', 'She is pursuing her goal.', 'l11'],
      ['trūkti', 'to lack / be short of', 'Man trūksta [laiko|laikas].', "I'm short on time.", 'l3', 'Like reikėti: person in the Dative, missing thing in the Genitive.'],
      ['pritrūkti', 'to run short of', 'Pritrūko [cukraus|cukrus].', 'We ran short of sugar.', 'l11'],
      ['netekti', 'to lose', 'Jis neteko [darbo|darbas].', 'He lost his job.', 'l11'],
      ['atsikratyti', 'to get rid of', 'Noriu atsikratyti [senų daiktų|seni daiktai].', 'I want to get rid of old things.', 'l11'],
      ['mokytis', 'to study (a subject)', 'Ji mokosi [anglų kalbos|anglų kalba].', 'She is studying English.', 'l3', 'Contrast: mokytis + Locative = the place where you study.'],
      ['gailėtis', 'to regret / pity', 'Gailiuosi savo [klaidos|klaida].', 'I regret my mistake.', 'l11'],
      ['pageidauti', 'to wish for / desire', 'Pageidauju [ramybės|ramybė].', 'I wish for peace.', 'l11'],
      ['trokšti', 'to long for / crave', 'Trokštu [laimės|laimė].', 'I long for happiness.', 'l11'],
      ['neapkęsti', 'to hate', 'Neapkenčiu [melo|melas].', 'I hate lies.', 'l11'],
      ['saugotis', 'to beware of', 'Saugokis [šuns|šuo].', 'Beware of the dog.', 'l11'],
      ['atsisakyti', 'to refuse / give up', 'Atsisakau [saldumynų|saldumynai].', "I'm giving up sweets.", 'l11'],
      ['pasigesti', 'to notice the absence of', 'Pasigedau [rakto|raktas].', 'I noticed my key was missing.', 'l11'],
      ['stokoti', 'to lack (formal)', 'Jis stokoja [patirties|patirtis].', 'He lacks experience.', 'l11', 'The person is the subject (jis). For an impersonal version use stigti: Jam stinga patirties.'],
      ['šalintis', 'to keep away from', 'Ji šalinasi [žmonių|žmonės].', 'She keeps away from people.', 'l11'],
      ['sulaukti', 'to wait until / live to see', 'Sulaukėme [pavasario|pavasaris].', 'We lived to see spring.', 'l11'],
      ['prašyti', 'to ask for / request', 'Prašau [pagalbos|pagalba].', "I'm asking for help.", 'l3'],
      ['klausti', 'to ask (a person)', 'Klausiu [mokytojo|mokytojas].', 'I ask the teacher.', 'l11'],
      ['semtis', 'to draw on / gain', 'Semiuosi [įkvėpimo|įkvėpimas] iš gamtos.', 'I draw inspiration from nature.', 'l11'],
      ['ilgėtis', 'to miss / long for', 'Ilgiuosi [namų|namai].', 'I miss home.', 'l3'],
      ['gedėti', 'to mourn', 'Gedime savo [draugo|draugas].', 'We mourn our friend.', 'l11'],
      ['reikalauti', 'to demand', 'Reikalauju [atsakymo|atsakymas].', 'I demand an answer.', 'l11'],
      ['tikėtis', 'to expect / hope for', 'Tikiuosi [pagalbos|pagalba].', "I'm hoping for help.", 'l3'],
      ['griebtis', 'to resort to / grasp at', 'Jis griebiasi [bet kokios progos|bet kokia proga].', 'He grasps at any opportunity.', 'l11'],
      ['imtis', 'to undertake / take up', 'Imuosi [naujo darbo|naujas darbas].', "I'm taking up a new job.", 'l11'],
      ['laikytis', 'to abide by / adhere to', 'Laikomės [taisyklių|taisyklės].', 'We abide by the rules.', 'l11'],
      ['pasiilgti', 'to miss (someone)', 'Pasiilgau [tavęs|tu].', 'I missed you.', 'l3'],
      ['nusipelnyti', 'to deserve / earn', 'Ji nusipelnė [pagarbos|pagarba].', 'She deserves respect.', 'l11']
    ],
    dat: [
      ['padėti', 'to help', 'Aš padedu [draugui|draugas].', 'I help my friend.', 'l4'],
      ['patikti', 'to please / be liked', '[Man|aš] patinka ši daina.', 'I like this song.', 'l4', 'English flips it: literally "this song pleases to me". The liker is in the Dative.'],
      ['skambinti', 'to call (by phone)', 'Paskambinsiu [mamai|mama].', "I'll call mom.", 'l4'],
      ['rašyti', 'to write to', 'Rašau laišką [draugui|draugas].', "I'm writing a letter to my friend.", 'l4'],
      ['sakyti', 'to tell (someone)', 'Pasakiau tiesą [mokytojui|mokytojas].', 'I told the teacher the truth.', 'l4'],
      ['duoti', 'to give (to)', 'Duodu knygą [broliui|brolis].', "I'm giving the book to my brother.", 'l4'],
      ['linkėti', 'to wish (someone)', 'Linkiu [tau|tu] sėkmės.', 'I wish you luck.', 'l4', 'The person is Dative, the thing wished is Genitive (sėkmės).'],
      ['pavydėti', 'to envy', 'Jis pavydi [kaimynui|kaimynas].', 'He envies his neighbour.', 'l8'],
      ['atleisti', 'to forgive', 'Atleidau [draugui|draugas].', 'I forgave my friend.', 'l8'],
      ['dėkoti', 'to thank', 'Dėkoju [mokytojai|mokytoja].', 'I thank the teacher.', 'l4'],
      ['leisti', 'to allow / let', 'Tėvai leidžia [vaikui|vaikas] žaisti.', 'The parents let the child play.', 'l8', 'Contrast: leisti + Accusative = "to spend" (money, time).'],
      ['trukdyti', 'to disturb / bother', 'Netrukdyk [broliui|brolis].', "Don't disturb your brother.", 'l8'],
      ['pritarti', 'to agree with', 'Pritariu tavo [idėjai|idėja].', 'I agree with your idea.', 'l8'],
      ['vadovauti', 'to lead / manage', 'Ji vadovauja [komandai|komanda].', 'She leads the team.', 'l12', 'A classic learner error is the Accusative (*vadovauja komandą*).'],
      ['tarnauti', 'to serve', 'Kareiviai tarnauja [tėvynei|tėvynė].', 'Soldiers serve the homeland.', 'l12', 'Contrast: tarnauti + Locative = where you serve (kariuomenėje).'],
      ['siūlyti', 'to offer / suggest to', 'Siūlau [tau|tu] šią knygą.', "I'm offering you this book.", 'l8'],
      ['žadėti', 'to promise (to)', 'Žadu [draugui|draugas] dovaną.', 'I promise my friend a gift.', 'l8'],
      ['aiškinti', 'to explain to', 'Aiškinu [mokiniui|mokinys] taisykles.', 'I explain the rules to the student.', 'l8'],
      ['pasakoti', 'to tell / narrate to', 'Pasakoju [vaikams|vaikai] pasaką.', 'I tell the children a fairy tale.', 'l8'],
      ['priminti', 'to remind', 'Primenu [draugui|draugas] susitikimą.', 'I remind my friend about the meeting.', 'l8'],
      ['patarti', 'to advise', 'Patariu [draugui|draugas].', 'I advise my friend.', 'l8'],
      ['įsakyti', 'to command / order', 'Karininkas įsako [kareiviui|kareivis].', 'The officer orders the soldier.', 'l12'],
      ['drausti', 'to forbid', 'Draudžiu [vaikui|vaikas] žaisti gatvėje.', 'I forbid the child to play in the street.', 'l12'],
      ['pavesti', 'to entrust / assign to', 'Pavedu [darbuotojui|darbuotojas] užduotį.', 'I assign the employee a task.', 'l12'],
      ['padovanoti', 'to give as a gift to', 'Padovanojau [draugui|draugas] knygą.', 'I gave my friend a book as a gift.', 'l4'],
      ['skolinti', 'to lend to', 'Skolinu [draugui|draugas] knygą.', "I'm lending my friend a book.", 'l8'],
      ['grąžinti', 'to return (something) to', 'Grąžinu knygą [bibliotekai|biblioteka].', "I'm returning the book to the library.", 'l8'],
      ['siųsti', 'to send to', 'Siunčiu laišką [draugui|draugas].', "I'm sending a letter to my friend.", 'l4'],
      ['rodyti', 'to show to', 'Rodau [draugui|draugas] nuotrauką.', "I'm showing my friend a photo.", 'l4'],
      ['rūpėti', 'to matter to / concern', '[Man|aš] rūpi tavo sveikata.', 'Your health matters to me.', 'l8'],
      ['atrodyti', 'to seem to', '[Jam|jis] atrodo, kad aš klystu.', "It seems to him that I'm wrong.", 'l8'],
      ['tikti', 'to suit / fit', 'Ši suknelė tinka [tau|tu].', 'This dress suits you.', 'l4'],
      ['pavykti', 'to manage / succeed', '[Man|aš] pavyko išspręsti problemą.', 'I managed to solve the problem.', 'l8'],
      ['nutikti', 'to happen to', '[Jam|jis] nutiko nelaimė.', 'An accident happened to him.', 'l8'],
      ['priklausyti', 'to belong to', 'Namas priklauso [broliui|brolis].', 'The house belongs to my brother.', 'l8'],
      ['prieštarauti', 'to contradict / object to', 'Prieštarauju tavo [nuomonei|nuomonė].', 'I object to your opinion.', 'l12'],
      ['paklusti', 'to submit to / obey', 'Kareiviai paklūsta [įsakymui|įsakymas].', 'Soldiers obey the order.', 'l12'],
      ['priešintis', 'to resist', 'Jis priešinasi [pokyčiams|pokyčiai].', 'He resists changes.', 'l12'],
      ['pasiduoti', 'to give in to', 'Nepasiduok [pagundai|pagunda].', "Don't give in to temptation.", 'l12']
    ],
    acc: [
      ['matyti', 'to see', 'Aš matau [paukštį|paukštis].', 'I see a bird.', 'l1'],
      ['mylėti', 'to love', 'Jis myli savo [šeimą|šeima].', 'He loves his family.', 'l1'],
      ['pažinti', 'to know (a person)', 'Aš pažįstu [tą vyrą|tas vyras].', 'I know that man.', 'l10'],
      ['statyti', 'to build', 'Jie stato [namą|namas].', 'They are building a house.', 'l10'],
      ['pirkti', 'to buy', 'Nusipirkau [naują telefoną|naujas telefonas].', 'I bought a new phone.', 'l1'],
      ['skaityti', 'to read', 'Skaitau [įdomią knygą|įdomi knyga].', "I'm reading an interesting book.", 'l1'],
      ['valgyti', 'to eat', 'Vaikai valgo [obuolius|obuoliai].', 'The children are eating apples.', 'l1'],
      ['gerti', 'to drink', 'Geriu [kavą|kava].', "I'm drinking coffee.", 'l1'],
      ['daryti', 'to do / make', '[Ką|kas] tu darai?', 'What are you doing?', 'l1'],
      ['mėgti', 'to like / enjoy', 'Aš mėgstu [šokoladą|šokoladas].', 'I like chocolate.', 'l1'],
      ['rasti', 'to find', 'Radau savo [raktus|raktai].', 'I found my keys.', 'l5'],
      ['pamiršti', 'to forget', 'Pamiršau savo [skėtį|skėtis].', 'I forgot my umbrella.', 'l5'],
      ['turėti', 'to have', 'Turiu [automobilį|automobilis].', 'I have a car.', 'l1'],
      ['žinoti', 'to know (a fact)', 'Žinau [atsakymą|atsakymas].', 'I know the answer.', 'l1'],
      ['suprasti', 'to understand', 'Suprantu [klausimą|klausimas].', 'I understand the question.', 'l1'],
      ['girdėti', 'to hear', 'Girdžiu [muziką|muzika].', 'I hear music.', 'l1'],
      ['jausti', 'to feel', 'Jaučiu [skausmą|skausmas].', 'I feel pain.', 'l10'],
      ['atsiminti', 'to remember', 'Atsimenu savo [vaikystę|vaikystė].', 'I remember my childhood.', 'l5'],
      ['sutikti', 'to meet', 'Sutikau [seną draugą|senas draugas].', 'I met an old friend.', 'l5'],
      ['mokėti', 'to know how to / can', 'Moku [anglų kalbą|anglų kalba].', 'I know English.', 'l5'],
      ['auginti', 'to raise / grow', 'Jie augina [vaikus|vaikai].', 'They are raising children.', 'l10'],
      ['tvarkyti', 'to organise / tidy', 'Tvarkau [kambarį|kambarys].', "I'm tidying the room.", 'l5'],
      ['taisyti', 'to fix / repair', 'Taisau [automobilį|automobilis].', "I'm fixing the car.", 'l5'],
      ['vairuoti', 'to drive', 'Ji vairuoja [automobilį|automobilis].', 'She drives a car.', 'l5'],
      ['dainuoti', 'to sing', 'Vaikai dainuoja [dainą|daina].', 'The children are singing a song.', 'l10'],
      ['žaisti', 'to play (a game)', 'Berniukai žaidžia [futbolą|futbolas].', 'The boys are playing football.', 'l5'],
      ['studijuoti', 'to study (a field)', 'Studijuoju [mediciną|medicina].', "I'm studying medicine.", 'l9'],
      ['baigti', 'to finish', 'Baigiau [darbą|darbas].', 'I finished the work.', 'l9'],
      ['pradėti', 'to start', 'Pradedu [naują projektą|naujas projektas].', "I'm starting a new project.", 'l9'],
      ['tęsti', 'to continue', 'Tęsiame [darbą|darbas].', 'We continue the work.', 'l9'],
      ['keisti', 'to change', 'Keičiu [planą|planas].', "I'm changing the plan.", 'l9'],
      ['rinkti', 'to collect / gather', 'Renku [pašto ženklus|pašto ženklai].', 'I collect stamps.', 'l10'],
      ['nešti', 'to carry', 'Nešu [sunkų krepšį|sunkus krepšys].', "I'm carrying a heavy bag.", 'l10'],
      ['vežti', 'to transport', 'Vežu [prekes|prekės] į turgų.', "I'm taking goods to the market.", 'l10'],
      ['valdyti', 'to manage / control', 'Jis valdo [įmonę|įmonė].', 'He manages a company.', 'l9'],
      ['kurti', 'to create', 'Ji kuria [muziką|muzika].', 'She creates music.', 'l9'],
      ['piešti', 'to draw / paint', 'Vaikas piešia [paveikslą|paveikslas].', 'The child is drawing a picture.', 'l10'],
      ['planuoti', 'to plan', 'Planuojame [kelionę|kelionė].', "We're planning a trip.", 'l9'],
      ['valyti', 'to clean', 'Valau [namus|namai].', "I'm cleaning the house.", 'l5'],
      ['virti', 'to cook / boil', 'Viriau [sriubą|sriuba].', 'I cooked soup.', 'l5', 'Past tense of virti is viriau (verdu, viriau, virsiu).'],
      ['kepti', 'to bake / fry', 'Kepu [pyragą|pyragas].', "I'm baking a cake.", 'l5'],
      ['taupyti', 'to save (money)', 'Taupau [pinigus|pinigai].', "I'm saving money.", 'l9'],
      ['leisti', 'to spend (money, time)', 'Leidžiu [pinigus|pinigai] drabužiams.', 'I spend money on clothes.', 'l9', 'Contrast: leisti + Dative = "to allow". With daug (a lot) the noun turns Genitive: Leidžiu daug pinigų.']
    ],
    ins: [
      ['domėtis', 'to be interested in', 'Domiuosi [istorija|istorija].', "I'm interested in history.", 'l6', 'For -a nouns the Instrumental (istorija) is spelled like the Nominative, but the final -a is short.'],
      ['žavėtis', 'to admire', 'Visi žavisi jos [talentu|talentas].', 'Everyone admires her talent.', 'l6'],
      ['didžiuotis', 'to be proud of', 'Tėvai didžiuojasi [vaikais|vaikai].', 'The parents are proud of their children.', 'l6'],
      ['naudotis', 'to use', 'Naudojuosi [kompiuteriu|kompiuteris].', 'I use the computer.', 'l6'],
      ['rūpintis', 'to take care of', 'Ji rūpinasi savo [tėvais|tėvai].', 'She takes care of her parents.', 'l6', 'Contrast: rūpintis dėl + Genitive = to worry about.'],
      ['pasitikėti', 'to trust', 'Aš pasitikiu [tavimi|tu].', 'I trust you.', 'l6'],
      ['tapti', 'to become', 'Jis tapo [gydytoju|gydytojas].', 'He became a doctor.', 'l6'],
      ['gėrėtis', 'to delight in / enjoy', 'Gėrimės gamtos [grožiu|grožis].', 'We delight in the beauty of nature.', 'l6'],
      ['sirgti', 'to be sick with', 'Vaikas serga [gripu|gripas].', 'The child is sick with the flu.', 'l6', 'Contrast: sirgti dėl + Genitive = to be worried sick about.'],
      ['verstis', 'to make a living from', 'Jis verčiasi [žemdirbyste|žemdirbystė].', 'He makes his living from farming.', 'l13'],
      ['kvėpuoti', 'to breathe', 'Mes kvėpuojame [oru|oras].', 'We breathe air.', 'l13'],
      ['skirtis', 'to differ (by)', 'Šie modeliai skiriasi [kaina|kaina].', 'These models differ in price.', 'l13'],
      ['pasinaudoti', 'to take advantage of', 'Pasinaudojau [proga|proga].', 'I took advantage of the opportunity.', 'l13'],
      ['girtis', 'to boast about', 'Jis giriasi savo [pasiekimais|pasiekimai].', 'He boasts about his achievements.', 'l13'],
      ['vaišintis', 'to treat oneself to', 'Vaišinamės [vaisiais|vaisiai].', "We're treating ourselves to fruit.", 'l13'],
      ['puikuotis', 'to show off / flaunt', 'Ji puikuojasi [nauju automobiliu|naujas automobilis].', 'She shows off her new car.', 'l13'],
      ['apsirengti', 'to dress oneself in', 'Apsirengiau [suknele|suknelė].', 'I dressed in a dress.', 'l13'],
      ['kvepėti', 'to smell of', 'Gėlės kvepia [medumi|medus].', 'The flowers smell of honey.', 'l6'],
      ['garsėti', 'to be famous for', 'Miestas garsėja [gražia architektūra|graži architektūra].', 'The city is famous for its beautiful architecture.', 'l13'],
      ['pasižymėti', 'to be distinguished by', 'Jis pasižymi [drąsa|drąsa].', 'He is distinguished by courage.', 'l13'],
      ['prekiauti', 'to trade / deal in', 'Parduotuvė prekiauja [avalyne|avalynė].', 'The store deals in footwear.', 'l13'],
      ['užsiimti', 'to be engaged in', 'Ji užsiima [sportu|sportas].', 'She is engaged in sports.', 'l6'],
      ['dirbti', 'to work as (a profession)', 'Jis dirba [gydytoju|gydytojas].', 'He works as a doctor.', 'l6', 'Contrast: dirbti + Locative = the place of work.'],
      ['likti', 'to remain (as / in a role)', 'Jie liko [draugais|draugai].', 'They remained friends.', 'l13', 'Contrast: likti + Locative = the place one stays.'],
      ['laikyti', 'to consider / regard as', 'Aš laikau jį [draugu|draugas].', 'I consider him a friend.', 'l13', 'Two complements: the person in the Accusative (jį) + the role in the Instrumental (draugu).'],
      ['vadinti', 'to call / name as', 'Visi vadina jį [herojumi|herojus].', 'Everyone calls him a hero.', 'l13', 'Two complements: Accusative (jį) + Instrumental (herojumi).'],
      ['gyventi', 'to live by / live on', 'Jis gyvena [viltimi|viltis].', 'He lives on hope.', 'l13', 'Contrast: gyventi + Locative = the place one lives.'],
      ['išrinkti', 'to elect as', 'Jie išrinko ją [prezidente|prezidentė].', 'They elected her president.', 'l13', 'Two complements: Accusative (ją) + Instrumental (prezidente).'],
      ['maitintis', 'to feed on / subsist on', 'Kiškiai maitinasi [žole|žolė].', 'Rabbits feed on grass.', 'l13'],
      ['aprūpinti', 'to provide / supply with', 'Valstybė aprūpina šeimas [maistu|maistas].', 'The state provides families with food.', 'l13', 'Person in the Accusative (šeimas) + thing supplied in the Instrumental (maistu).'],
      ['apdovanoti', 'to award / reward with', 'Jį apdovanojo [medaliu|medalis].', 'He was awarded a medal.', 'l13', 'Person in the Accusative (jį) + prize in the Instrumental (medaliu).']
    ],
    loc: [
      ['gyventi', 'to live', 'Aš gyvenu [Vilniuje|Vilnius].', 'I live in Vilnius.', 'l2'],
      ['dirbti', 'to work', 'Ji dirba [ligoninėje|ligoninė].', 'She works at a hospital.', 'l2'],
      ['mokytis', 'to study (at a place)', 'Jis mokosi [universitete|universitetas].', 'He studies at university.', 'l2'],
      ['sėdėti', 'to sit', 'Vaikai sėdi [klasėje|klasė].', 'The children are sitting in the classroom.', 'l2'],
      ['stovėti', 'to stand', 'Automobilis stovi [kieme|kiemas].', 'The car is standing in the yard.', 'l5'],
      ['gulėti', 'to lie', 'Knyga guli [stalčiuje|stalčius].', 'The book is lying in the drawer.', 'l5'],
      ['likti', 'to stay / remain (at a place)', 'Aš liksiu [namuose|namai].', "I'll stay home.", 'l2'],
      ['augti', 'to grow up', 'Jis užaugo [kaime|kaimas].', 'He grew up in the village.', 'l10'],
      ['miegoti', 'to sleep', 'Miegu [viešbutyje|viešbutis].', 'I sleep at a hotel.', 'l2'],
      ['slėptis', 'to hide', 'Vaikai slepiasi [miške|miškas].', 'The children are hiding in the forest.', 'l10'],
      ['vaikščioti', 'to walk / wander', 'Mes vaikščiojame [parke|parkas].', 'We are walking in the park.', 'l2'],
      ['žydėti', 'to bloom', 'Rožės žydi [sode|sodas].', 'Roses are blooming in the garden.', 'l10'],
      ['ilsėtis', 'to rest', 'Mes ilsimės [kalnuose|kalnai].', 'We are resting in the mountains.', 'l5'],
      ['keliauti', 'to travel', 'Jie keliauja [Europoje|Europa].', 'They are travelling in Europe.', 'l2'],
      ['sportuoti', 'to exercise', 'Aš sportuoju [salėje|salė].', 'I exercise in the gym.', 'l5'],
      ['tarnauti', 'to serve (in)', 'Jis tarnauja [kariuomenėje|kariuomenė].', 'He serves in the army.', 'l10', 'Contrast: tarnauti + Dative = the person or cause one serves.'],
      ['gimti', 'to be born', 'Gimiau [Vilniuje|Vilnius].', 'I was born in Vilnius.', 'l2'],
      ['mirti', 'to die', 'Jis mirė [ligoninėje|ligoninė].', 'He died in the hospital.', 'l10'],
      ['būti', 'to be (located)', 'Jis yra [namuose|namai].', 'He is at home.', 'l2'],
      ['sustoti', 'to stop', 'Autobusas sustojo [stotelėje|stotelė].', 'The bus stopped at the bus stop.', 'l9'],
      ['apsistoti', 'to stay / lodge', 'Mes apsistojome [viešbutyje|viešbutis].', 'We stayed at a hotel.', 'l9'],
      ['lankytis', 'to visit / attend', 'Aš lankausi [muziejuje|muziejus].', 'I visit the museum.', 'l9'],
      ['dalyvauti', 'to participate', 'Jis dalyvauja [konferencijoje|konferencija].', 'He is participating in the conference.', 'l9'],
      ['vykti', 'to take place', 'Susitikimas vyksta [biure|biuras].', 'The meeting is taking place in the office.', 'l9']
    ]
  };

  /* Part 6 — same verb, different case */
  const PAIRS = [
    { verb: 'tikėti', a: ['dat', 'Aš [tau|tu] tikiu.', 'I believe you.', 'crediting what a person says'],
      b: ['ins', 'Tikiu [savimi|save].', 'I believe in myself.', 'faith or confidence in someone or something'] },
    { verb: 'mokytis', a: ['gen', 'Mokausi [ispanų kalbos|ispanų kalba].', "I'm studying Spanish.", 'the subject being studied'],
      b: ['loc', 'Mokausi [universitete|universitetas].', 'I study at university.', 'the place where you study'] },
    { verb: 'dirbti', a: ['ins', 'Jis dirba [gydytoju|gydytojas].', 'He works as a doctor.', 'the role or profession'],
      b: ['loc', 'Jis dirba [ligoninėje|ligoninė].', 'He works at a hospital.', 'the place of work'] },
    { verb: 'likti', a: ['ins', 'Jie liko [draugais|draugai].', 'They remained friends.', 'the role one remains in'],
      b: ['loc', 'Aš liksiu [namuose|namai].', "I'll stay home.", 'the place one stays'] },
    { verb: 'gyventi', a: ['ins', 'Jis gyvena [viltimi|viltis].', 'He lives on hope.', 'what one lives by'],
      b: ['loc', 'Aš gyvenu [Vilniuje|Vilnius].', 'I live in Vilnius.', 'the place one lives'] },
    { verb: 'tarnauti', a: ['dat', 'Kareiviai tarnauja [tėvynei|tėvynė].', 'Soldiers serve the homeland.', 'the person or cause one serves'],
      b: ['loc', 'Jis tarnauja [kariuomenėje|kariuomenė].', 'He serves in the army.', 'where one serves'] },
    { verb: 'leisti', a: ['dat', 'Leidžiu [vaikui|vaikas] žaisti.', 'I let the child play.', 'the person being allowed'],
      b: ['acc', 'Leidžiu [pinigus|pinigai] drabužiams.', 'I spend money on clothes.', 'a different verb meaning: to spend'] },
    { verb: 'sirgti', a: ['ins', 'Sergu [gripu|gripas].', "I'm sick with the flu.", 'the illness itself'],
      b: ['pp', 'Sergu dėl [tavęs|tu].', "I'm worried sick about you.", 'dėl + Genitive: figurative, a prepositional phrase'] },
    { verb: 'rūpintis', a: ['ins', 'Rūpinuosi savo [sveikata|sveikata].', 'I take care of my health.', 'the object of care'],
      b: ['pp', 'Rūpinuosi dėl [rytojaus|rytojus].', 'I worry about tomorrow.', 'dėl + Genitive: worrying about an abstract concern'] }
  ];

  /* Part 7 — the negation rule: [affirmative, correct negated, wrong negated, English, caseThatStays?] */
  const NEGATION = [
    ['Aš matau šunį.', 'Aš nematau šuns.', 'Aš nematau šunį.', "I don't see a dog."],
    ['Skaitau knygą.', 'Neskaitau knygos.', 'Neskaitau knygą.', "I'm not reading a book."],
    ['Turiu automobilį.', 'Neturiu automobilio.', 'Neturiu automobilį.', "I don't have a car."],
    ['Geriu kavą.', 'Negeriu kavos.', 'Negeriu kavą.', "I don't drink coffee."],
    ['Žinau atsakymą.', 'Nežinau atsakymo.', 'Nežinau atsakymą.', "I don't know the answer."],
    ['Suprantu klausimą.', 'Nesuprantu klausimo.', 'Nesuprantu klausimą.', "I don't understand the question."],
    ['Mėgstu šokoladą.', 'Nemėgstu šokolado.', 'Nemėgstu šokoladą.', "I don't like chocolate."],
    ['Girdžiu muziką.', 'Negirdžiu muzikos.', 'Negirdžiu muziką.', "I don't hear any music."],
    ['Man reikia pinigų.', 'Man nereikia pinigų.', 'Man nereikia pinigus.', "I don't need money.", 'gen'],
    ['Laukiu autobuso.', 'Nelaukiu autobuso.', 'Nelaukiu autobusą.', "I'm not waiting for the bus.", 'gen'],
    ['Aš padedu draugui.', 'Aš nepadedu draugui.', 'Aš nepadedu draugo.', "I'm not helping my friend.", 'dat'],
    ['Domiuosi istorija.', 'Nesidomiu istorija.', 'Nesidomiu istorijos.', "I'm not interested in history.", 'ins']
  ];

  const LEVELS = [
    { id: 'A1', lt: 'Pradžia', en: 'Foundations', blurb: 'The two cases you meet first: what you act on, and where you are.' },
    { id: 'A2', lt: 'Kasdienybė', en: 'Everyday life', blurb: 'Wanting, needing, giving and helping, in daily routines.' },
    { id: 'B1', lt: 'Pasaulis', en: 'Your world', blurb: 'Interests and roles, the negation rule, work and life stories.' },
    { id: 'B2', lt: 'Gylis', en: 'Depth', blurb: 'The full Genitive, Dative and Instrumental lists, and verbs whose case changes the meaning.' },
    { id: 'C1', lt: 'Meistrystė', en: 'Mastery', blurb: 'All 174 verbs, interleaved.' }
  ];

  /* Dialogue line types:
   *  ['n', lt, en]                                   partner speaks
   *  ['c', intentEn, [[lt, en, isCorrect, feedback], ...]]   learner chooses
   *  ['t', intentEn, frame, 'ans1|ans2', lemma, fullEn]       learner types the missing word
   */
  const LESSONS = [
    { id: 'l1', level: 'A1', cases: ['acc'], title: 'Your first objects', lt: 'Galininkas', minutes: 15,
      goals: ['Recognise the Accusative (galininkas) as the default case for a direct object',
        'Use 12 everyday verbs like matyti, pirkti and gerti with the right object form',
        'Order a drink and chat about what you are reading in a café'],
      intro: `<p>Most Lithuanian verbs behave the way English verbs do. The thing you see, buy, eat or read is a direct object, and it goes in the <b>Accusative</b> (<i>galininkas</i>). It answers the question <b>Ką?</b> (what? whom?).</p>
        <p>This is the default. If a verb isn't on one of the other four lists in this course, assume it takes the Accusative.</p>`,
      tip: 'Listen for the nasal vowels at the end of the word: <b>-ą, -į, -ų, -ę</b> in the singular, <b>-us, -as, -es, -is</b> in the plural.',
      dialogue: { title: 'Kavinėje', en: 'At a café in Vilnius', partner: 'Rūta', role: 'barista', lines: [
        ['n', 'Labas! Ką geriate šiandien?', 'Hi! What are you drinking today?'],
        ['c', 'Say you are drinking coffee.', [
          ['Geriu kavą.', "I'm drinking coffee.", 1, 'gerti takes a direct object in the Accusative: kava → kavą.'],
          ['Geriu kava.', null, 0, 'kava is the Nominative (or Instrumental). After gerti you need the Accusative kavą.'],
          ['Geriu kavoje.', null, 0, 'kavoje is the Locative: "in the coffee". You need the Accusative kavą.']]],
        ['n', 'Puiku. Ar mėgstate šokoladą? Turime šokoladinį pyragą.', 'Great. Do you like chocolate? We have chocolate cake.'],
        ['c', 'Say yes, you like chocolate.', [
          ['Taip, mėgstu šokoladą.', 'Yes, I like chocolate.', 1, 'mėgti + Accusative: šokoladas → šokoladą.'],
          ['Taip, mėgstu šokoladui.', null, 0, 'šokoladui is the Dative ("to the chocolate"). mėgti takes the Accusative.'],
          ['Taip, mėgstu šokoladu.', null, 0, 'šokoladu is the Instrumental. mėgti takes the Accusative šokoladą.']]],
        ['n', 'Ką skaitote?', 'What are you reading?'],
        ['t', 'Say you are reading an interesting book.', 'Skaitau įdomią ___.', 'knygą', 'knyga', "I'm reading an interesting book."],
        ['n', 'O, matau jūsų telefoną. Naujas?', 'Oh, I see your phone. Is it new?'],
        ['c', 'Say yes, you bought a new phone.', [
          ['Taip, nusipirkau naują telefoną.', 'Yes, I bought a new phone.', 1, 'Both the adjective and the noun take the Accusative: naują telefoną.'],
          ['Taip, nusipirkau naujas telefonas.', null, 0, 'That is the Nominative. The thing bought is an Accusative object: naują telefoną.'],
          ['Taip, nusipirkau naujam telefonui.', null, 0, 'That is the Dative. pirkti takes the Accusative: naują telefoną.']]],
        ['n', 'Gražus! Skanios kavos!', 'Lovely! Enjoy your coffee!']
      ] } },

    { id: 'l2', level: 'A1', cases: ['loc'], title: 'Where you are', lt: 'Vietininkas', minutes: 15,
      goals: ['Say where you live, work and study with the bare Locative',
        'Use 10 verbs of place and state, such as gyventi, dirbti and gimti',
        'Introduce yourself to a new neighbour'],
      intro: `<p>Lithuanian needs no word for "in" or "at" with these verbs. The <b>Locative</b> (<i>vietininkas</i>) ending does the job on its own: <i>Vilnius → Vilniuje</i>, <i>ligoninė → ligoninėje</i>, <i>namai → namuose</i>.</p>
        <p>It answers the question <b>Kur?</b> (where?).</p>`,
      tip: 'Locative endings: <b>-e, -yje, -oje, -ėje, -uje</b> in the singular, <b>-uose, -ose, -ėse</b> in the plural.',
      dialogue: { title: 'Susipažinkime', en: 'Meeting a new neighbour', partner: 'Tomas', role: 'neighbour', lines: [
        ['n', 'Labas! Aš Tomas, jūsų naujas kaimynas. Kur jūs gimėte?', "Hi! I'm Tomas, your new neighbour. Where were you born?"],
        ['t', 'Say you were born in Kaunas.', 'Gimiau ___.', 'Kaune', 'Kaunas', 'I was born in Kaunas.'],
        ['n', 'O dabar gyvenate Vilniuje?', 'And now you live in Vilnius?'],
        ['c', 'Say yes, you live in Vilnius now.', [
          ['Taip, dabar gyvenu Vilniuje.', 'Yes, I live in Vilnius now.', 1, 'gyventi + Locative: Vilnius → Vilniuje.'],
          ['Taip, dabar gyvenu Vilnių.', null, 0, 'Vilnių is the Accusative. A place you live in takes the Locative: Vilniuje.'],
          ['Taip, dabar gyvenu Vilniaus.', null, 0, 'Vilniaus is the Genitive. You need the Locative: Vilniuje.']]],
        ['n', 'Kur dirbate?', 'Where do you work?'],
        ['c', 'Say you work at a hospital.', [
          ['Dirbu ligoninėje.', 'I work at a hospital.', 1, 'dirbti + Locative = the place of work: ligoninėje.'],
          ['Dirbu ligoninę.', null, 0, 'ligoninę is the Accusative. The place of work takes the Locative: ligoninėje.'],
          ['Dirbu ligonine.', null, 0, 'ligonine is the Instrumental, which would mean you work AS a hospital. Use the Locative.']]],
        ['n', 'O aš mokausi universitete. Ar šį vakarą būsite namuose?', "And I study at university. Will you be at home this evening?"],
        ['c', 'Say yes, you will stay home.', [
          ['Taip, liksiu namuose.', "Yes, I'll stay home.", 1, 'likti + Locative = the place you stay: namuose.'],
          ['Taip, liksiu namus.', null, 0, 'namus is the Accusative. Staying somewhere takes the Locative: namuose.'],
          ['Taip, liksiu namais.', null, 0, 'likti + Instrumental means to remain in a role. For a place use namuose.']]],
        ['n', 'Puiku, užeisiu su pyragu!', "Great, I'll drop by with a cake!"]
      ] } },

    { id: 'l3', level: 'A2', cases: ['gen'], title: 'Wanting, needing, waiting', lt: 'Kilmininkas I', minutes: 20,
      goals: ['Use the Genitive (kilmininkas) after verbs of wanting, needing and waiting',
        'Learn 12 high-frequency Genitive verbs, such as norėti, laukti and ieškoti',
        'Hold a short conversation at a bus stop'],
      intro: `<p>Genitive verbs express <b>wanting, needing, seeking, waiting, fearing, avoiding, lacking or losing</b>. The object is something reached for rather than directly acted on, often "some of" something.</p>
        <p>It answers <b>Ko?</b> (of what? whom?). With <i>reikėti</i> and <i>trūkti</i> the person goes in the Dative: <i>Man reikia pinigų</i>, literally "to me there is need of money".</p>`,
      tip: 'Genitive endings: <b>-o, -io, -os, -ės, -aus</b> in the singular, and <b>-ų</b> in almost every plural.',
      dialogue: { title: 'Stotelėje', en: 'At the bus stop', partner: 'Ona', role: 'fellow passenger', lines: [
        ['n', 'Atsiprašau, ar jūs taip pat laukiate autobuso?', 'Excuse me, are you waiting for the bus too?'],
        ['c', 'Say yes, you are waiting for the bus.', [
          ['Taip, laukiu autobuso.', "Yes, I'm waiting for the bus.", 1, 'laukti + Genitive: autobusas → autobuso.'],
          ['Taip, laukiu autobusą.', null, 0, 'You will hear this in casual speech, but standard Lithuanian uses the Genitive after laukti: autobuso.'],
          ['Taip, laukiu autobusui.', null, 0, 'autobusui is the Dative. laukti takes the Genitive: autobuso.']]],
        ['n', 'Jis vėluoja. Ko ieškote savo krepšyje?', "It's late. What are you looking for in your bag?"],
        ['t', 'Say you are looking for your key.', 'Ieškau savo ___.', 'rakto', 'raktas', "I'm looking for my key."],
        ['n', 'Ar jums reikia pagalbos?', 'Do you need help?'],
        ['c', 'Say no thanks, but you want some water because it is very hot.', [
          ['Ne, ačiū. Bet noriu vandens, labai karšta.', "No, thanks. But I'd like some water, it's very hot.", 1, 'norėti + Genitive ("some water"): vanduo → vandens.'],
          ['Ne, ačiū. Bet noriu vandenį, labai karšta.', null, 0, 'vandenį is the Accusative. norėti takes the Genitive: vandens.'],
          ['Ne, ačiū. Bet noriu vandeniui, labai karšta.', null, 0, 'vandeniui is the Dative. norėti takes the Genitive: vandens.']]],
        ['n', 'Štai, imkite. Ar mokotės lietuvių kalbos?', 'Here, take this. Are you learning Lithuanian?'],
        ['c', 'Say yes, you are learning Lithuanian.', [
          ['Taip, mokausi lietuvių kalbos.', "Yes, I'm learning Lithuanian.", 1, 'mokytis + Genitive = the subject you study: kalba → kalbos.'],
          ['Taip, mokausi lietuvių kalboje.', null, 0, 'mokytis + Locative is the place where you study, not the subject.'],
          ['Taip, mokausi lietuvių kalbai.', null, 0, 'kalbai is the Dative. The subject of study takes the Genitive: kalbos.']]],
        ['n', 'Puikiai kalbate! O, štai ir autobusas!', 'You speak really well! Oh, here comes the bus!']
      ] } },

    { id: 'l4', level: 'A2', cases: ['dat'], title: 'Giving, helping, liking', lt: 'Naudininkas I', minutes: 20,
      goals: ['Mark the person on the receiving end with the Dative (naudininkas)',
        'Use 12 verbs of giving, helping, telling and liking',
        'Buy a gift and thank a shop assistant'],
      intro: `<p>Dative verbs involve a person on the <b>receiving end</b> of help, speech, a gift or a feeling. Many match English verbs with "to" or "for": write to, give to, show to.</p>
        <p>It answers <b>Kam?</b> (to whom?). <i>Patikti</i> flips the English: <i>Man patinka ši daina</i>, literally "this song is pleasing to me".</p>`,
      tip: 'Dative endings: <b>-ui, -iui, -ai, -ei</b> in the singular, <b>-ams, -iams, -oms, -ėms</b> in the plural. Pronouns: man, tau, jam, jai.',
      dialogue: { title: 'Dovana draugei', en: 'A birthday gift', partner: 'Lina', role: 'shop assistant', lines: [
        ['n', 'Laba diena! Kuo galiu jums padėti?', 'Good afternoon! How can I help you?'],
        ['c', 'Say you are looking for a gift for your friend (draugė).', [
          ['Ieškau dovanos draugei.', "I'm looking for a gift for my friend.", 1, 'Two cases at once: ieškoti + Genitive (dovanos), and the person it is for in the Dative (draugei).'],
          ['Ieškau dovanos draugę.', null, 0, 'draugę is the Accusative. The person the gift is for takes the Dative: draugei.'],
          ['Ieškau dovaną draugei.', null, 0, 'ieškoti takes the Genitive: dovanos, not dovaną.']]],
        ['n', 'Ar jai patinka knygos?', 'Does she like books?'],
        ['c', 'Say yes, she likes books very much.', [
          ['Taip, jai labai patinka knygos.', 'Yes, she likes books very much.', 1, 'With patikti the liker is in the Dative: jai.'],
          ['Taip, ją labai patinka knygos.', null, 0, 'ją is the Accusative. With patikti the liker is Dative: jai.'],
          ['Taip, ji labai patinka knygos.', null, 0, 'ji is the Nominative. The books are the subject here; the liker is Dative: jai.']]],
        ['n', 'Siūlau šią knygą apie Vilnių.', 'I suggest this book about Vilnius.'],
        ['t', 'Say you will give the book to your friend (draugė).', 'Padovanosiu knygą ___.', 'draugei', 'draugė', "I'll give the book to my friend."],
        ['n', 'Puikus pasirinkimas! Ar norite atviruko?', 'Great choice! Would you like a card?'],
        ['c', 'Say yes, you will wish her happiness.', [
          ['Taip, palinkėsiu jai laimės.', "Yes, I'll wish her happiness.", 1, 'linkėti: the person in the Dative (jai), the thing wished in the Genitive (laimės).'],
          ['Taip, palinkėsiu ją laimės.', null, 0, 'ją is the Accusative. The person you wish something to is Dative: jai.'],
          ['Taip, palinkėsiu jai laimę.', null, 0, 'The thing wished goes in the Genitive in standard Lithuanian: laimės.']]],
        ['c', 'Thank the shop assistant.', [
          ['Dėkoju jums!', 'Thank you!', 1, 'dėkoti + Dative: jūs → jums.'],
          ['Dėkoju jus!', null, 0, 'jus is the Accusative. dėkoti takes the Dative: jums.'],
          ['Dėkoju jūsų!', null, 0, 'jūsų is the Genitive. dėkoti takes the Dative: jums.']]],
        ['n', 'Nėra už ką! Gražios dienos!', "You're welcome! Have a lovely day!"]
      ] } },

    { id: 'l5', level: 'A2', cases: ['acc', 'loc'], title: 'Home and daily life', lt: 'Kasdienybė', minutes: 20,
      goals: ['Combine an Accusative object and a Locative place in one sentence',
        'Use 16 verbs for home routines, such as rasti, tvarkyti and virti',
        'Sort out a busy morning with a flatmate'],
      intro: `<p>Everyday sentences often use two cases at once: <i>Radau raktus virtuvėje</i>. I found the keys (Accusative) in the kitchen (Locative).</p>
        <p>Ask two questions: <b>Ką?</b> for the thing you act on, <b>Kur?</b> for where it is.</p>`,
      tip: 'Some objects are always plural: <i>namai</i> (home) → Accusative <b>namus</b>, Locative <b>namuose</b>.',
      dialogue: { title: 'Rytas', en: 'A busy morning', partner: 'Mantas', role: 'flatmate', lines: [
        ['n', 'Labas rytas! Ar radai savo raktus?', 'Good morning! Did you find your keys?'],
        ['c', 'Say yes, you found the keys in the kitchen.', [
          ['Taip, radau raktus virtuvėje.', 'Yes, I found the keys in the kitchen.', 1, 'rasti + Accusative (raktus), and the place in the Locative (virtuvėje).'],
          ['Taip, radau raktų virtuvėje.', null, 0, 'raktų is the Genitive. rasti takes the Accusative: raktus.'],
          ['Taip, radau raktais virtuvėje.', null, 0, 'raktais is the Instrumental. rasti takes the Accusative: raktus.']]],
        ['n', 'Puiku. O kur mano telefonas?', 'Great. And where is my phone?'],
        ['t', 'Say his phone is lying in the drawer.', 'Tavo telefonas guli ___.', 'stalčiuje', 'stalčius', 'Your phone is lying in the drawer.'],
        ['n', 'Ačiū! Šiandien aš tvarkau kambarį. O tu?', "Thanks! Today I'm tidying the room. What about you?"],
        ['c', 'Say you are cooking soup.', [
          ['Aš verdu sriubą.', "I'm cooking soup.", 1, 'virti + Accusative: sriuba → sriubą.'],
          ['Aš verdu sriuba.', null, 0, 'sriuba is the Nominative or Instrumental. virti takes the Accusative: sriubą.'],
          ['Aš verdu sriubai.', null, 0, 'sriubai is the Dative ("for the soup"). Use the Accusative: sriubą.']]],
        ['n', 'Skanu! Po pietų sportuoju salėje. Eisi kartu?', "Yum! After lunch I'm exercising at the gym. Coming along?"],
        ['c', 'Say no, you will rest in the park.', [
          ['Ne, aš ilsėsiuosi parke.', "No, I'll rest in the park.", 1, 'ilsėtis + Locative: parkas → parke.'],
          ['Ne, aš ilsėsiuosi parką.', null, 0, 'parką is the Accusative. Where you rest takes the Locative: parke.'],
          ['Ne, aš ilsėsiuosi parku.', null, 0, 'parku is the Instrumental. Use the Locative: parke.']]],
        ['n', 'Gerai, iki vakaro!', 'OK, see you tonight!']
      ] } },

    { id: 'l6', level: 'B1', cases: ['ins'], title: 'Interests, pride and trust', lt: 'Įnagininkas I', minutes: 20,
      goals: ['Use the Instrumental (įnagininkas) for interests, pride, trust and roles',
        'Learn 12 Instrumental verbs, such as domėtis, didžiuotis and pasitikėti',
        'Talk about your hobbies and your job'],
      intro: `<p>Instrumental verbs express <b>interest, admiration, pride, trust, becoming something</b>, or the means by which a state comes about (an illness, a smell).</p>
        <p>It answers <b>Kuo?</b> (with what? as what?). Many of these verbs are reflexive and end in <i>-tis</i>: <i>domėtis, didžiuotis, naudotis, rūpintis</i>.</p>`,
      tip: 'Instrumental endings: <b>-u, -iu, -a, -e, -umi</b> in the singular, <b>-ais, -iais, -omis, -ėmis</b> in the plural. Pronouns: manimi, tavimi, juo, ja.',
      dialogue: { title: 'Pomėgiai', en: 'Talking about hobbies', partner: 'Gintarė', role: 'language exchange partner', lines: [
        ['n', 'Kuo domiesi laisvalaikiu?', 'What are you interested in in your free time?'],
        ['c', 'Say you are interested in history.', [
          ['Domiuosi istorija.', "I'm interested in history.", 1, 'domėtis + Instrumental. For -a nouns it is spelled like the Nominative: istorija.'],
          ['Domiuosi istoriją.', null, 0, 'istoriją is the Accusative. domėtis takes the Instrumental: istorija.'],
          ['Domiuosi istorijos.', null, 0, 'istorijos is the Genitive. domėtis takes the Instrumental: istorija.']]],
        ['n', 'Įdomu! O kuo tu dirbi?', 'Interesting! And what do you work as?'],
        ['t', 'Say you work as a doctor.', 'Dirbu ___.', 'gydytoju|gydytoja', 'gydytojas / gydytoja', 'I work as a doctor.'],
        ['n', 'Oho! Tavo šeima tikriausiai tavimi didžiuojasi.', 'Wow! Your family must be proud of you.'],
        ['c', 'Say yes, and you are proud of them too.', [
          ['Taip, o aš didžiuojuosi jais.', "Yes, and I'm proud of them.", 1, 'didžiuotis + Instrumental: jie → jais.'],
          ['Taip, o aš didžiuojuosi juos.', null, 0, 'juos is the Accusative. didžiuotis takes the Instrumental: jais.'],
          ['Taip, o aš didžiuojuosi jiems.', null, 0, 'jiems is the Dative. didžiuotis takes the Instrumental: jais.']]],
        ['n', 'Ar naudojiesi programėlėmis lietuvių kalbai mokytis?', 'Do you use apps to learn Lithuanian?'],
        ['c', 'Say yes, you use this app every day.', [
          ['Taip, kasdien naudojuosi šia programėle.', 'Yes, I use this app every day.', 1, 'naudotis + Instrumental: ši programėlė → šia programėle.'],
          ['Taip, kasdien naudojuosi šią programėlę.', null, 0, 'That is the Accusative. naudotis takes the Instrumental: šia programėle.'],
          ['Taip, kasdien naudojuosi šios programėlės.', null, 0, 'That is the Genitive. naudotis takes the Instrumental: šia programėle.']]],
        ['n', 'Puiku! Tu tikrai greitai kalbėsi lietuviškai.', "Great! You'll be speaking Lithuanian in no time."]
      ] } },

    { id: 'l7', level: 'B1', cases: ['acc', 'gen'], special: 'neg', title: 'Saying no', lt: 'Neiginys', minutes: 15,
      goals: ['Apply the negation rule: a negated Accusative object shifts to the Genitive',
        'Know that Genitive, Dative and Instrumental objects keep their case under negation',
        'Say what you don’t have, didn’t see or don’t need'],
      intro: `<p>One case shift applies across the board. When a verb that normally takes an <b>Accusative</b> object is negated with <i>ne-</i>, the object moves into the <b>Genitive</b>.</p>
        <p>Verbs that already govern the Genitive, Dative or Instrumental keep their case. Only the Accusative is affected.</p>`,
      tip: '<i>Aš matau šunį</i> → <i>Aš nematau <b>šuns</b></i>. But <i>Man reikia pinigų</i> → <i>Man nereikia pinigų</i> (no change).',
      dialogue: { title: 'Blogas rytas', en: 'A bad morning', partner: 'Jonas', role: 'colleague', lines: [
        ['n', 'Kas nutiko? Atrodai pavargęs.', 'What happened? You look tired.'],
        ['c', 'Say you don’t have a car today.', [
          ['Šiandien neturiu automobilio.', "I don't have a car today.", 1, 'turėti normally takes the Accusative, so when negated the object turns Genitive: automobilio.'],
          ['Šiandien neturiu automobilį.', null, 0, 'This is the classic mistake. A negated Accusative object becomes Genitive: automobilio.']]],
        ['n', 'Gal matei mano kavą? Palikau ją čia.', 'Did you see my coffee? I left it here.'],
        ['c', 'Say no, you didn’t see the coffee.', [
          ['Ne, nemačiau kavos.', "No, I didn't see the coffee.", 1, 'Negated matyti: Accusative kavą becomes Genitive kavos.'],
          ['Ne, nemačiau kavą.', null, 0, 'After a negated verb the Accusative shifts to the Genitive: kavos.']]],
        ['n', 'Ar supratai šefo laišką?', "Did you understand the boss's letter?"],
        ['t', 'Say no, you didn’t understand his letter.', 'Ne, nesupratau jo ___.', 'laiško', 'laiškas', "No, I didn't understand his letter."],
        ['n', 'Nesijaudink. Ar tau reikia pagalbos?', "Don't worry. Do you need help?"],
        ['c', 'Say no, you don’t need help.', [
          ['Ne, man nereikia pagalbos.', "No, I don't need help.", 1, 'reikėti already takes the Genitive, so negation changes nothing: pagalbos.'],
          ['Ne, man nereikia pagalbą.', null, 0, 'reikėti always takes the Genitive, with or without negation: pagalbos.']]],
        ['n', 'Gerai. Rytoj bus geriau!', 'OK. Tomorrow will be better!']
      ] } },

    { id: 'l8', level: 'B1', cases: ['dat'], title: 'Telling, lending, advising', lt: 'Naudininkas II', minutes: 20,
      goals: ['Use verbs that take a person in the Dative and a thing in the Accusative',
        'Express impersonal ideas such as Man pavyko and Jam atrodo',
        'Give a friend advice'],
      intro: `<p>Many Dative verbs come with two objects: the <b>person in the Dative</b> and the <b>thing in the Accusative</b>. <i>Skolinu draugui knygą</i>: I lend my friend a book.</p>
        <p>Others are impersonal. The person who experiences something stands in the Dative and there is no "I" in the Nominative: <i>Man pavyko</i> (I managed), <i>Jam atrodo</i> (it seems to him).</p>`,
      tip: 'Ask <b>Kam?</b> for the person and <b>Ką?</b> for the thing. Both can sit in one sentence.',
      dialogue: { title: 'Patarimas', en: 'Advice to a friend', partner: 'Eglė', role: 'friend', lines: [
        ['n', 'Labas! Ką tu darai?', 'Hi! What are you doing?'],
        ['c', 'Say you are explaining the rules to a student.', [
          ['Aiškinu mokiniui taisykles.', "I'm explaining the rules to a student.", 1, 'aiškinti: person in the Dative (mokiniui), thing in the Accusative (taisykles).'],
          ['Aiškinu mokinį taisykles.', null, 0, 'mokinį is the Accusative. The person you explain to takes the Dative: mokiniui.'],
          ['Aiškinu mokinio taisykles.', null, 0, 'mokinio is the Genitive, so this means "the student\'s rules". Use the Dative: mokiniui.']]],
        ['n', 'Klausyk, ar galėtum paskolinti man knygą?', 'Listen, could you lend me a book?'],
        ['c', 'Say yes, you will lend her the book tomorrow.', [
          ['Taip, rytoj paskolinsiu tau knygą.', "Yes, I'll lend you the book tomorrow.", 1, 'skolinti: person in the Dative (tau), thing in the Accusative (knygą).'],
          ['Taip, rytoj paskolinsiu tave knygą.', null, 0, 'tave is the Accusative. The person you lend to takes the Dative: tau.'],
          ['Taip, rytoj paskolinsiu tavimi knygą.', null, 0, 'tavimi is the Instrumental. Use the Dative: tau.']]],
        ['n', 'Ačiū! Ir primink man apie susitikimą.', 'Thanks! And remind me about the meeting.'],
        ['t', 'Say OK, you will remind her about the meeting.', 'Gerai, priminsiu ___ susitikimą.', 'tau', 'tu', "OK, I'll remind you about the meeting."],
        ['n', 'Ar tau atrodo, kad aš per daug dirbu?', 'Does it seem to you that I work too much?'],
        ['c', 'Say yes, it seems so to you, and you advise her to rest.', [
          ['Taip, man taip atrodo. Patariu tau pailsėti.', 'Yes, it seems so to me. I advise you to rest.', 1, 'atrodyti and patarti both take the Dative: man, tau.'],
          ['Taip, mane taip atrodo. Patariu tave pailsėti.', null, 0, 'mane and tave are Accusative. atrodyti and patarti take the Dative: man, tau.'],
          ['Taip, aš taip atrodo. Patariu tu pailsėti.', null, 0, 'aš and tu are Nominative. Use the Dative: man, tau.']]],
        ['n', 'Ačiū už patarimą!', 'Thanks for the advice!']
      ] } },

    { id: 'l9', level: 'B1', cases: ['acc', 'loc'], title: 'Work, study and plans', lt: 'Darbas', minutes: 20,
      goals: ['Talk about starting, finishing and changing work with Accusative verbs',
        'Say where events take place with vykti, dalyvauti and apsistoti',
        'Plan a project with your manager'],
      intro: `<p>Work talk mixes the two cases you met first. Projects, plans and reports are <b>Accusative</b> objects: <i>pradedu projektą, keičiu planą</i>.</p>
        <p>Meetings, conferences and hotels are <b>Locative</b> places: <i>susitikimas vyksta biure</i>.</p>`,
      tip: '<i>leisti</i> + Accusative means "to spend": <i>leidžiu pinigus</i>. Keep it apart from <i>leisti</i> + Dative, "to allow".',
      dialogue: { title: 'Darbo planas', en: 'Planning a project', partner: 'Vaida', role: 'manager', lines: [
        ['n', 'Labas rytas! Ar jau baigei ataskaitą?', 'Good morning! Have you finished the report?'],
        ['c', 'Say yes, you finished the report yesterday.', [
          ['Taip, vakar baigiau ataskaitą.', 'Yes, I finished the report yesterday.', 1, 'baigti + Accusative: ataskaita → ataskaitą.'],
          ['Taip, vakar baigiau ataskaitos.', null, 0, 'ataskaitos is the Genitive. baigti takes the Accusative: ataskaitą.'],
          ['Taip, vakar baigiau ataskaita.', null, 0, 'ataskaita is the Nominative or Instrumental. Use the Accusative: ataskaitą.']]],
        ['n', 'Puiku. Kitą savaitę pradedame naują projektą. Kur vyks susitikimas?', "Great. Next week we start a new project. Where will the meeting be?"],
        ['t', 'Say the meeting will take place in the office.', 'Susitikimas vyks ___.', 'biure', 'biuras', 'The meeting will take place in the office.'],
        ['n', 'Gerai. Ar dalyvausi konferencijoje Kaune?', 'Good. Will you attend the conference in Kaunas?'],
        ['c', 'Say yes, and you will stay at a hotel.', [
          ['Taip, apsistosiu viešbutyje.', "Yes, I'll stay at a hotel.", 1, 'apsistoti + Locative: viešbutis → viešbutyje.'],
          ['Taip, apsistosiu viešbutį.', null, 0, 'viešbutį is the Accusative. Where you lodge takes the Locative: viešbutyje.'],
          ['Taip, apsistosiu viešbučio.', null, 0, 'viešbučio is the Genitive. Use the Locative: viešbutyje.']]],
        ['n', 'Turime mažą biudžetą. Reikia taupyti pinigus.', 'Our budget is small. We need to save money.'],
        ['c', 'Say then let’s change the plan.', [
          ['Tada keiskime planą.', "Then let's change the plan.", 1, 'keisti + Accusative: planas → planą.'],
          ['Tada keiskime plano.', null, 0, 'plano is the Genitive. keisti takes the Accusative: planą.'],
          ['Tada keiskime planu.', null, 0, 'planu is the Instrumental. keisti takes the Accusative: planą.']]],
        ['n', 'Puiki mintis!', 'Great idea!']
      ] } },

    { id: 'l10', level: 'B1', cases: ['acc', 'loc'], title: 'Life stories', lt: 'Gyvenimo istorijos', minutes: 20,
      goals: ['Tell stories about growing up, building and creating',
        'Use 14 Accusative and Locative verbs, such as auginti, statyti and augti',
        'Talk with your grandmother about the past'],
      intro: `<p>Stories about the past mix what people did (<b>Accusative</b>: <i>statė namą, augino vaikus</i>) with where it happened (<b>Locative</b>: <i>užaugo kaime, slėpėsi miške</i>).</p>
        <p>The tense changes, but the case never does. A verb takes the same case in the past, present and future.</p>`,
      tip: 'The case belongs to the verb, not the tense: <i>stato namą, statė namą, statys namą</i>.',
      dialogue: { title: 'Močiutės istorija', en: "Grandma's story", partner: 'Močiutė Ona', role: 'grandmother', lines: [
        ['n', 'Ar žinai, kur aš užaugau?', 'Do you know where I grew up?'],
        ['c', 'Ask if she grew up in a village.', [
          ['Ar užaugai kaime?', 'Did you grow up in a village?', 1, 'augti + Locative: kaimas → kaime.'],
          ['Ar užaugai kaimą?', null, 0, 'kaimą is the Accusative. Where you grew up takes the Locative: kaime.'],
          ['Ar užaugai kaimo?', null, 0, 'kaimo is the Genitive. Use the Locative: kaime.']]],
        ['n', 'Taip, mažame kaime. Mūsų sode žydėjo rožės, o vaikai slėpdavosi miške.', 'Yes, in a small village. Roses bloomed in our garden, and the children used to hide in the forest.'],
        ['t', 'Say you collect old photos.', 'Renku senas ___.', 'nuotraukas', 'nuotraukos', 'I collect old photos.'],
        ['n', 'Tada tau parodysiu albumą! Tavo senelis statė mūsų namą.', "Then I'll show you the album! Your grandfather built our house."],
        ['c', 'Say you want to draw that house.', [
          ['Noriu nupiešti tą namą.', 'I want to draw that house.', 1, 'piešti + Accusative: tas namas → tą namą.'],
          ['Noriu nupiešti tam namui.', null, 0, 'That is the Dative. piešti takes the Accusative: tą namą.'],
          ['Noriu nupiešti tuo namu.', null, 0, 'That is the Instrumental. piešti takes the Accusative: tą namą.']]],
        ['n', 'Gerai. Bet pirma eime namo. Krepšys sunkus...', "Good. But first let's go home. The bag is heavy..."],
        ['c', 'Say you will carry her heavy bag.', [
          ['Aš nešiu tavo sunkų krepšį.', "I'll carry your heavy bag.", 1, 'nešti + Accusative: sunkus krepšys → sunkų krepšį.'],
          ['Aš nešiu tavo sunkaus krepšio.', null, 0, 'That is the Genitive. A positive nešti takes the Accusative: sunkų krepšį.'],
          ['Aš nešiu tavo sunkiu krepšiu.', null, 0, 'That is the Instrumental. nešti takes the Accusative: sunkų krepšį.']]],
        ['n', 'Ačiū, vaikeli!', 'Thank you, dear!']
      ] } },

    { id: 'l11', level: 'B2', cases: ['gen'], title: 'Desire, loss and duty', lt: 'Kilmininkas II', minutes: 25,
      goals: ['Use 25 more Genitive verbs of desire, loss, avoidance and duty',
        'Recognise reflexive Genitive verbs such as laikytis, imtis and saugotis',
        'Discuss goals and habits with a coach'],
      intro: `<p>The rest of the Genitive list follows the same idea: things you <b>strive for, give up, lose, avoid or deserve</b>. <i>Siekiu tikslo. Atsisakau saldumynų. Neteko darbo.</i></p>
        <p>Watch the pair <i>klausytis</i> (listen to) and <i>klausyti</i> (obey). Both take the Genitive; the <i>-s</i> changes the meaning.</p>`,
      tip: 'If the English idea is "reach for", "keep away from" or "go without", reach for the Genitive.',
      dialogue: { title: 'Su treneriu', en: 'Talking with a coach', partner: 'Darius', role: 'coach', lines: [
        ['n', 'Ko sieki šiais metais?', 'What are you aiming for this year?'],
        ['c', 'Say you are pursuing your goal: a marathon.', [
          ['Siekiu savo tikslo: maratono.', "I'm pursuing my goal: a marathon.", 1, 'siekti + Genitive: tikslas → tikslo, maratonas → maratono.'],
          ['Siekiu savo tikslą: maratoną.', null, 0, 'That is the Accusative. siekti takes the Genitive: tikslo, maratono.'],
          ['Siekiu savo tikslui: maratonui.', null, 0, 'That is the Dative. siekti takes the Genitive: tikslo, maratono.']]],
        ['n', 'Puiku. Tada reikės atsisakyti kai kurių įpročių.', "Great. Then you'll need to give up some habits."],
        ['c', 'Say you are giving up sweets.', [
          ['Atsisakau saldumynų.', "I'm giving up sweets.", 1, 'atsisakyti + Genitive: saldumynai → saldumynų.'],
          ['Atsisakau saldumynus.', null, 0, 'That is the Accusative. atsisakyti takes the Genitive: saldumynų.'],
          ['Atsisakau saldumynais.', null, 0, 'That is the Instrumental. atsisakyti takes the Genitive: saldumynų.']]],
        ['n', 'O ko tau labiausiai trūksta?', 'And what do you lack most?'],
        ['t', 'Say you lack time.', 'Man trūksta ___.', 'laiko', 'laikas', "I'm short on time."],
        ['n', 'Suprantu. Svarbu laikytis plano ir vengti traumų.', "I understand. It's important to stick to the plan and avoid injuries."],
        ['c', 'Say you will stick to the rules.', [
          ['Laikysiuosi taisyklių.', "I'll stick to the rules.", 1, 'laikytis + Genitive: taisyklės → taisyklių.'],
          ['Laikysiuosi taisykles.', null, 0, 'That is the Accusative. laikytis (reflexive) takes the Genitive: taisyklių.'],
          ['Laikysiuosi taisyklėmis.', null, 0, 'That is the Instrumental. laikytis takes the Genitive: taisyklių.']]],
        ['n', 'Tu nusipelnei pagarbos. Pirmyn!', 'You deserve respect. Off you go!']
      ] } },

    { id: 'l12', level: 'B2', cases: ['dat'], title: 'Authority and resistance', lt: 'Naudininkas III', minutes: 15,
      goals: ['Use Dative verbs of leading, ordering, obeying and resisting',
        'Avoid the common error of using the Accusative after vadovauti',
        'Run a team meeting'],
      intro: `<p>Authority in Lithuanian is aimed <b>at</b> someone, so it takes the Dative. You lead <i>to</i> a team (<i>vadovauti komandai</i>), give orders <i>to</i> a soldier (<i>įsakyti kareiviui</i>), resist <i>to</i> change (<i>priešintis pokyčiams</i>).</p>
        <p>English uses a plain direct object here, which is why learners often slip into the Accusative.</p>`,
      tip: 'Resisting and yielding are Dative too: <i>priešintis, prieštarauti, paklusti, pasiduoti</i>.',
      dialogue: { title: 'Susirinkimas', en: 'A team meeting', partner: 'Rasa', role: 'director', lines: [
        ['n', 'Kas vadovauja šiam projektui?', 'Who is leading this project?'],
        ['c', 'Say you lead the team.', [
          ['Aš vadovauju komandai.', 'I lead the team.', 1, 'vadovauti + Dative: komanda → komandai.'],
          ['Aš vadovauju komandą.', null, 0, 'A very common error. vadovauti takes the Dative: komandai.'],
          ['Aš vadovauju komandos.', null, 0, 'komandos is the Genitive. vadovauti takes the Dative: komandai.']]],
        ['n', 'Gerai. Kai kurie darbuotojai priešinasi pokyčiams.', 'Good. Some employees are resisting the changes.'],
        ['c', 'Say you will assign each employee a task.', [
          ['Pavesiu kiekvienam darbuotojui užduotį.', "I'll assign each employee a task.", 1, 'pavesti: person in the Dative (kiekvienam darbuotojui), task in the Accusative (užduotį).'],
          ['Pavesiu kiekvieną darbuotoją užduotį.', null, 0, 'The person you assign a task to takes the Dative: kiekvienam darbuotojui.'],
          ['Pavesiu kiekvieno darbuotojo užduotį.', null, 0, 'That is the Genitive ("each employee\'s task"). Use the Dative: kiekvienam darbuotojui.']]],
        ['n', 'O jeigu kas nors prieštarauja tavo nuomonei?', 'And if someone objects to your opinion?'],
        ['t', 'Say you won’t give in to pressure.', 'Aš nepasiduosiu ___.', 'spaudimui', 'spaudimas', "I won't give in to pressure."],
        ['n', 'Puiku. Sėkmės!', 'Excellent. Good luck!']
      ] } },

    { id: 'l13', level: 'B2', cases: ['ins'], title: 'Roles and reputations', lt: 'Įnagininkas II', minutes: 25,
      goals: ['Use two-complement verbs: a person in the Accusative and a role in the Instrumental',
        'Describe what places and people are famous or known for',
        'Follow a guided tour of Vilnius'],
      intro: `<p>Several verbs take <b>two complements</b>: the person in the Accusative and the role or thing in the Instrumental. <i>Laikau jį draugu</i>: I consider him a friend. <i>Jį apdovanojo medaliu</i>: he was awarded a medal.</p>
        <p>Reputation verbs use the Instrumental too: <i>Vilnius garsėja architektūra</i>, Vilnius is famous for its architecture.</p>`,
      tip: 'Ask <b>Ką?</b> for the person and <b>Kuo?</b> for the role: <i>išrinko <b>ją</b> <b>prezidente</b></i>.',
      dialogue: { title: 'Ekskursija', en: 'A city tour', partner: 'Paulius', role: 'tour guide', lines: [
        ['n', 'Sveiki atvykę į Vilnių! Šis miestas garsėja baroko architektūra.', 'Welcome to Vilnius! This city is famous for its baroque architecture.'],
        ['c', 'Ask what else Vilnius is famous for.', [
          ['Kuo dar garsėja Vilnius?', 'What else is Vilnius famous for?', 1, 'garsėti + Instrumental, so the question word is Kuo?'],
          ['Ką dar garsėja Vilnius?', null, 0, 'Ką? asks for an Accusative. garsėti takes the Instrumental, so ask Kuo?'],
          ['Ko dar garsėja Vilnius?', null, 0, 'Ko? asks for a Genitive. garsėti takes the Instrumental, so ask Kuo?']]],
        ['n', 'Senamiesčiu ir šaltibarščiais! Vilniečiai laiko šaltibarščius vasaros simboliu.', 'Its Old Town and cold beet soup! Vilnians consider šaltibarščiai a symbol of summer.'],
        ['t', 'Say you consider Vilnius your second home.', 'Aš laikau Vilnių savo antraisiais ___.', 'namais', 'namai', 'I consider Vilnius my second home.'],
        ['n', 'Gražiai pasakyta! Ar norėtumėte pasivaišinti cepelinais?', 'Nicely said! Would you like to treat yourself to cepelinai?'],
        ['c', 'Say yes, let’s treat ourselves to cepelinai.', [
          ['Taip, pasivaišinkime cepelinais!', "Yes, let's treat ourselves to cepelinai!", 1, 'vaišintis + Instrumental: cepelinai → cepelinais.'],
          ['Taip, pasivaišinkime cepelinus!', null, 0, 'That is the Accusative. vaišintis takes the Instrumental: cepelinais.'],
          ['Taip, pasivaišinkime cepelinų!', null, 0, 'That is the Genitive. vaišintis takes the Instrumental: cepelinais.']]],
        ['n', 'Gero apetito! Šis restoranas pasižymi puikiu aptarnavimu.', 'Enjoy your meal! This restaurant is known for excellent service.']
      ] } },

    { id: 'l14', level: 'B2', cases: ['ins', 'loc', 'gen', 'dat', 'acc'], special: 'pairs', title: 'Same verb, different case', lt: 'Du linksniai', minutes: 20,
      goals: ['Tell apart pairs like dirbti gydytoju and dirbti ligoninėje',
        'Choose the case that carries the meaning you intend',
        'Explain your studies, your health and your beliefs'],
      intro: `<p>A handful of verbs govern more than one case, and the case carries part of the meaning. Learn them as pairs.</p>
        <p><i>Jis dirba gydytoju</i> (Instrumental) tells you his <b>role</b>. <i>Jis dirba ligoninėje</i> (Locative) tells you the <b>place</b>.</p>`,
      tip: 'Instrumental often means a role ("as"); Locative means a place ("in / at").',
      dialogue: { title: 'Du skirtingi dalykai', en: 'Two different things', partner: 'Simona', role: 'classmate', lines: [
        ['n', 'Girdėjau, kad tavo brolis dirba ligoninėje. Kuo jis dirba?', 'I heard your brother works at a hospital. What does he work as?'],
        ['c', 'Say he works as a doctor.', [
          ['Jis dirba gydytoju.', 'He works as a doctor.', 1, 'dirbti + Instrumental = the role: gydytoju.'],
          ['Jis dirba gydytoją.', null, 0, 'gydytoją is the Accusative. A role takes the Instrumental: gydytoju.'],
          ['Jis dirba gydytojuje.', null, 0, 'That is the Locative, which would make the doctor a place. Use the Instrumental: gydytoju.']]],
        ['n', 'O tu? Ko ir kur mokaisi?', 'And you? What and where do you study?'],
        ['c', 'Say you study at university and you are studying Spanish.', [
          ['Mokausi universitete. Mokausi ispanų kalbos.', 'I study at university. I study Spanish.', 1, 'mokytis + Locative = the place; mokytis + Genitive = the subject.'],
          ['Mokausi universiteto. Mokausi ispanų kalboje.', null, 0, 'The cases are swapped. The place takes the Locative (universitete), the subject the Genitive (kalbos).']]],
        ['n', 'Ar tiki, kad išmoksi?', "Do you believe you'll learn it?"],
        ['c', 'Say yes, you believe in yourself.', [
          ['Taip, tikiu savimi.', 'Yes, I believe in myself.', 1, 'tikėti + Instrumental = faith or confidence in someone: savimi.'],
          ['Taip, tikiu save.', null, 0, 'save is the Accusative, which tikėti never takes. Faith in someone is Instrumental: savimi.'],
          ['Taip, tikiu sau.', null, 0, 'tikėti + Dative means believing what someone says. Confidence IN yourself is Instrumental: savimi.']]],
        ['n', 'Šaunu! O kodėl taip blogai atrodai? Sergi?', "Great! But why do you look so unwell? Are you sick?"],
        ['t', 'Say yes, you are sick with the flu.', 'Taip, sergu ___.', 'gripu', 'gripas', "Yes, I'm sick with the flu."],
        ['n', 'Rūpinkis savo sveikata!', 'Take care of your health!'],
        ['c', 'Say thanks, you’ll stay home today.', [
          ['Ačiū, šiandien liksiu namuose.', "Thanks, I'll stay home today.", 1, 'likti + Locative = the place you stay: namuose.'],
          ['Ačiū, šiandien liksiu namais.', null, 0, 'likti + Instrumental means remaining in a role. For a place use the Locative: namuose.']]],
        ['n', 'Pasveik greitai!', 'Get well soon!']
      ] } },

    { id: 'l15', level: 'C1', cases: ['gen', 'dat', 'acc', 'ins', 'loc'], special: 'mix', title: 'Mastery challenge', lt: 'Visi linksniai', minutes: 25,
      goals: ['Identify the case for any of the 174 verbs in mixed practice',
        'Switch between all five cases in a single conversation',
        'Plan a day out in Vilnius'],
      intro: `<p>This lesson mixes every verb in the course. Mixing topics feels harder than practising one case at a time, and that is why it works: you have to decide which case to use, not just repeat the last one.</p>`,
      tip: 'Before you answer, ask yourself the case question: <b>Ko? Kam? Ką? Kuo? Kur?</b>',
      dialogue: { title: 'Diena Vilniuje', en: 'A day in Vilnius', partner: 'Rūta', role: 'friend', lines: [
        ['n', 'Labas vėl! Ko norėsi šiandien?', 'Hi again! What would you like today?'],
        ['c', 'Say you would like some tea.', [
          ['Norėčiau arbatos.', "I'd like some tea.", 1, 'norėti + Genitive: arbata → arbatos.'],
          ['Norėčiau arbatą.', null, 0, 'norėti takes the Genitive: arbatos.'],
          ['Norėčiau arbatai.', null, 0, 'arbatai is the Dative. norėti takes the Genitive: arbatos.']]],
        ['n', 'Kaip sekasi mokytis?', 'How is studying going?'],
        ['c', 'Say you managed to learn 174 verbs.', [
          ['Man pavyko išmokti 174 veiksmažodžius!', 'I managed to learn 174 verbs!', 1, 'pavykti is impersonal: the person goes in the Dative, man.'],
          ['Aš pavyko išmokti 174 veiksmažodžius!', null, 0, 'pavykti has no Nominative "I". The person is Dative: man.'],
          ['Mane pavyko išmokti 174 veiksmažodžius!', null, 0, 'mane is the Accusative. pavykti takes the Dative: man.']]],
        ['n', 'Nuostabu! Kuo dabar domiesi?', 'Amazing! What are you interested in now?'],
        ['t', 'Say you are interested in Lithuanian cinema (kinas).', 'Domiuosi lietuvišku ___.', 'kinu', 'kinas', "I'm interested in Lithuanian cinema."],
        ['n', 'Ar matei naują filmą apie Vilnių?', 'Have you seen the new film about Vilnius?'],
        ['c', 'Say no, you haven’t seen that film.', [
          ['Ne, nemačiau to filmo.', "No, I haven't seen that film.", 1, 'Negated matyti: the Accusative shifts to the Genitive, to filmo.'],
          ['Ne, nemačiau to filmą.', null, 0, 'After a negated verb the Accusative becomes the Genitive: to filmo.'],
          ['Ne, nemačiau tam filmui.', null, 0, 'That is the Dative. Negated matyti takes the Genitive: to filmo.']]],
        ['n', 'Tai eime kartu! Ar pasitiki manimi?', "Then let's go together! Do you trust me?"],
        ['c', 'Say of course, you trust her.', [
          ['Žinoma, pasitikiu tavimi!', 'Of course, I trust you!', 1, 'pasitikėti + Instrumental: tu → tavimi.'],
          ['Žinoma, pasitikiu tave!', null, 0, 'tave is the Accusative. pasitikėti takes the Instrumental: tavimi.'],
          ['Žinoma, pasitikiu tau!', null, 0, 'tau is the Dative. pasitikėti takes the Instrumental: tavimi.']]],
        ['n', 'Puiku! Susitinkame kine septintą.', "Great! We'll meet at the cinema at seven."]
      ] } }
  ];

  const RESEARCH = [
    { name: 'Spaced repetition', where: 'Review tab',
      how: 'Every verb you learn goes into a review queue. Answer correctly and the gap before you see it again grows: 1, 3, 7, 14, 30 days. Miss it and it comes back tomorrow.',
      cite: 'Cepeda, Pashler, Vul, Wixted & Rohrer (2006). Distributed practice in verbal recall tasks. Psychological Bulletin, 132(3).' },
    { name: 'Retrieval practice', where: 'Flashcards, Practice, Review',
      how: 'Cards ask you to recall the case before you flip them, and every exercise makes you produce an answer instead of rereading. Pulling an answer from memory strengthens it more than studying it again.',
      cite: 'Roediger & Karpicke (2006). Test-enhanced learning. Psychological Science, 17(3).' },
    { name: 'Interleaving', where: 'Practice, Review, Mastery challenge',
      how: 'Exercise types and cases are shuffled together, so you have to choose the right case every time instead of repeating the last answer.',
      cite: 'Rohrer & Taylor (2007), Instructional Science 35; Nakata & Suzuki (2019), Modern Language Journal 103(3), on interleaving in L2 grammar.' },
    { name: 'Explained corrective feedback', where: 'Every answer',
      how: 'After each answer you see why it is right or wrong: which case the verb governs, the question it answers, and the correct form. Missed items return at the end of the round.',
      cite: 'Lyster & Ranta (1997), SSLA 19; Li (2010), meta-analysis of corrective feedback in SLA, Language Learning 60(2).' },
    { name: 'Noticing', where: 'Discover, word detective, colour coding',
      how: 'Each case has its own colour, and the "tap the governed word" exercise makes you find the ending the verb controls. Learners acquire forms they consciously notice.',
      cite: 'Schmidt (1990). The role of consciousness in second language learning. Applied Linguistics, 11(2).' },
    { name: 'Pushed output', where: 'Typed answers, conversation turns',
      how: 'You type the inflected form yourself, with an on-screen keyboard for ą, č, ę, ė, į, š, ų, ū and ž. Producing language exposes gaps that recognition hides.',
      cite: 'Swain (1985). Communicative competence: some roles of comprehensible input and output.' },
    { name: 'Interaction', where: 'Conversation step',
      how: 'Every lesson ends in a role-play with a Lithuanian speaker. You choose or type your reply and get feedback on the case in context, as you would in real conversation.',
      cite: 'Long (1996). The role of the linguistic environment in second language acquisition. Handbook of SLA.' },
    { name: 'Graded, comprehensible input', where: 'Levels A1 to C1',
      how: 'Lessons move from the two most common cases to rarer verbs and meaning contrasts, so new material is always slightly beyond what you know.',
      cite: 'Krashen (1985). The Input Hypothesis: Issues and Implications.' },
    { name: 'Mastery learning', where: 'Lesson unlocking',
      how: 'The next lesson opens once you score at least 70% in Practice and finish the conversation. You build on solid ground.',
      cite: 'Bloom (1968), Learning for Mastery; Kulik, Kulik & Bangert-Drowns (1990), Review of Educational Research 60(2).' },
    { name: 'Goals and self-assessment', where: 'Goals and Reflect steps',
      how: 'Each lesson opens with concrete can-do goals and closes with a self-rating against them. Clear goals and reflection improve motivation and self-regulation.',
      cite: 'Locke & Latham (2002), American Psychologist 57(9); Zimmerman (2002), Theory Into Practice 41(2); Council of Europe CEFR can-do descriptors.' },
    { name: 'Listening and shadowing', where: 'Audio buttons, conversation replay',
      how: 'Every sentence can be played aloud and slowed down. After a conversation you can replay it and repeat each of your lines out loud, recording yourself where the browser allows.',
      cite: 'Hamada (2016). Shadowing: who benefits and how? Language Teaching Research, 20(1).' },
    { name: 'Learning in meaningful sets', where: 'Case-grouped lessons',
      how: 'Verbs are grouped by the case they govern and by meaning (wanting, giving, place), so you learn patterns instead of isolated items.',
      cite: 'Nation (2013). Learning Vocabulary in Another Language, 2nd ed., on semantic grouping and patterns.' }
  ];

  return { CASES, ENDINGS, VERBS, PAIRS, NEGATION, LEVELS, LESSONS, RESEARCH };
})();
