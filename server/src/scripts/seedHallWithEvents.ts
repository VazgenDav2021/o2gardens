import dotenv from 'dotenv';
import Hall from '../models/Hall';
import Event from '../models/Event';
import connectDB from '../config/database';

dotenv.config();

const seedHallWithEvents = async () => {
  try {
    await connectDB();

    // Create hall with schemas
    const hallData = {
      name: {
        en: "Main Hall",
        ru: "Главный Зал",
        hy: "Գլխավոր Սրահ"
      },
      description: {
        en: "Spacious main hall perfect for concerts, weddings, and corporate events",
        ru: "Просторный главный зал, идеально подходящий для концертов, свадеб и корпоративных мероприятий",
        hy: "Լայն գլխավոր սրահ, իդեալական համերգների, հարսանիքների և կորպորատիվ միջոցառումների համար"
      },
      capacity: 110,
      image: "/hall-1.jpg",
      schemas: [
        {
          dateRange: {
            startDate: new Date("2025-01-15T00:00:00.000Z"),
            endDate: new Date("2025-03-15T23:59:59.999Z")
          },
          tables: [
            { x: 100, y: 150, seats: 4, reserved: false },
            { x: 200, y: 150, seats: 4, reserved: false },
            { x: 300, y: 150, seats: 6, reserved: false },
            { x: 100, y: 250, seats: 4, reserved: false },
            { x: 200, y: 250, seats: 4, reserved: false },
            { x: 300, y: 250, seats: 6, reserved: false },
            { x: 150, y: 350, seats: 8, reserved: false },
            { x: 250, y: 350, seats: 8, reserved: false }
          ],
          scenes: [
            { x: 50, y: 50, width: 400, height: 80 }
          ]
        },
        {
          dateRange: {
            startDate: new Date("2025-03-16T00:00:00.000Z"),
            endDate: new Date("2025-06-15T23:59:59.999Z")
          },
          tables: [
            { x: 120, y: 180, seats: 6, reserved: false },
            { x: 250, y: 180, seats: 6, reserved: false },
            { x: 120, y: 280, seats: 6, reserved: false },
            { x: 250, y: 280, seats: 6, reserved: false },
            { x: 185, y: 380, seats: 10, reserved: false }
          ],
          scenes: [
            { x: 50, y: 50, width: 350, height: 100 },
            { x: 400, y: 50, width: 100, height: 100 }
          ]
        }
      ]
    };

    const hall = await Hall.create(hallData);
    console.log('✅ Hall created successfully:');
    console.log(`   ID: ${hall._id}`);
    console.log(`   Name (EN): ${hall.name.en}`);
    console.log(`   Schemas: ${hall.schemas.length}`);

    // Get schema IDs for events
    const schema1Id = hall.schemas[0]._id;
    const schema2Id = hall.schemas[1]._id;

    // Create events
    const eventsData = [
      {
        name: {
          en: "Jazz Night",
          ru: "Джазовая Ночь",
          hy: "Ջազային Գիշեր"
        },
        description: {
          en: "An unforgettable evening of live jazz music featuring renowned artists",
          ru: "Незабываемый вечер живой джазовой музыки с участием известных артистов",
          hy: "Անմոռանալի երեկո կենդանի ջազային երաժշտությամբ հայտնի արտիստների մասնակցությամբ"
        },
        artists: {
          en: "The Jazz Collective, Sarah Johnson Quartet",
          ru: "Джазовый Коллектив, Квартет Сары Джонсон",
          hy: "Ջազային Կոլեկտիվ, Սառա Ջոնսոնի Կվարտետ"
        },
        date: new Date("2025-02-10T20:00:00.000Z"),
        deposit: 5000,
        image: "/event-jazz.jpg",
        isAdult: false,
        hall: hall._id,
        capacity: 100,
        timeStart: "20:00",
        menu: [
          {
            name: {
              en: "Wine Selection",
              ru: "Подборка Вин",
              hy: "Գինու Ընտրանի"
            },
            description: {
              en: "Premium wine selection including red, white, and sparkling wines",
              ru: "Премиальная подборка вин, включая красные, белые и игристые вина",
              hy: "Պրեմիում գինու ընտրանի, ներառյալ կարմիր, սպիտակ և փրփրուն գինիներ"
            },
            price: 15000
          },
          {
            name: {
              en: "Cheese Platter",
              ru: "Сырная Тарелка",
              hy: "Պանրի Ափսե"
            },
            description: {
              en: "Assortment of fine cheeses with crackers and fruits",
              ru: "Ассортимент изысканных сыров с крекерами и фруктами",
              hy: "Բարեկարգ պանրերի ասորտիմենտ կրակերներով և մրգերով"
            },
            price: 8000
          },
          {
            name: {
              en: "Chocolate Fondue",
              ru: "Шоколадный Фондю",
              hy: "Շոկոլադե Ֆոնդյու"
            },
            description: {
              en: "Rich chocolate fondue with fresh fruits and marshmallows",
              ru: "Насыщенный шоколадный фондю со свежими фруктами и зефиром",
              hy: "Հարուստ շոկոլադե ֆոնդյու թարմ մրգերով և մարշմելլոներով"
            },
            price: 6000
          },
          {
            name: {
              en: "Cocktail Set",
              ru: "Коктейльный Набор",
              hy: "Կոկտեյլային Հավաքածու"
            },
            description: {
              en: "Premium cocktails: Old Fashioned, Mojito, Cosmopolitan",
              ru: "Премиальные коктейли: Олд Фешн, Мохито, Космополитен",
              hy: "Պրեմիում կոկտեյլներ: Օլդ Ֆեշն, Մոխիտո, Կոսմոպոլիտեն"
            },
            price: 12000
          }
        ],
        schema: schema1Id
      },
      {
        name: {
          en: "Classical Concert",
          ru: "Классический Концерт",
          hy: "Դասական Համերգ"
        },
        description: {
          en: "An elegant evening of classical music featuring a string quartet",
          ru: "Элегантный вечер классической музыки с участием струнного квартета",
          hy: "Էլեգանտ երեկո դասական երաժշտությամբ լարային կվարտետի մասնակցությամբ"
        },
        artists: {
          en: "Armenian Philharmonic String Quartet",
          ru: "Армянский Филармонический Струнный Квартет",
          hy: "Հայկական Ֆիլհարմոնիկ Լարային Կվարտետ"
        },
        date: new Date("2025-02-20T19:00:00.000Z"),
        deposit: 7000,
        image: "/event-classical.jpg",
        isAdult: false,
        hall: hall._id,
        capacity: 110,
        timeStart: "19:00",
        menu: [
          {
            name: {
              en: "Champagne Service",
              ru: "Шампанское",
              hy: "Շամպայն"
            },
            description: {
              en: "Premium champagne with caviar and canapés",
              ru: "Премиальное шампанское с икрой и канапе",
              hy: "Պրեմիում շամպայն սևուկով և կանապեներով"
            },
            price: 25000
          },
          {
            name: {
              en: "Gourmet Appetizers",
              ru: "Гурманские Закуски",
              hy: "Գուրմանական Նախուտեստներ"
            },
            description: {
              en: "Selection of fine appetizers: smoked salmon, prosciutto, bruschetta",
              ru: "Подборка изысканных закусок: копченый лосось, прошутто, брускетта",
              hy: "Բարեկարգ նախուտեստների ընտրանի: ծխահար սաղմոն, պրոշուտտո, բրուսկետա"
            },
            price: 10000
          },
          {
            name: {
              en: "Dessert Collection",
              ru: "Коллекция Десертов",
              hy: "Աղանդերի Հավաքածու"
            },
            description: {
              en: "Assorted desserts: tiramisu, crème brûlée, macarons",
              ru: "Ассорти десертов: тирамису, крем-брюле, макароны",
              hy: "Աղանդերի ասորտի: տիրամիսու, կրեմ բրյուլե, մակարոններ"
            },
            price: 7000
          }
        ],
        schema: schema1Id
      },
      {
        name: {
          en: "Karaoke Night",
          ru: "Караоке Ночь",
          hy: "Կարաոկե Գիշեր"
        },
        description: {
          en: "Fun karaoke night with friends and family",
          ru: "Веселая караоке ночь с друзьями и семьей",
          hy: "Զվարճալի կարաոկե գիշեր ընկերների և ընտանիքի հետ"
        },
        artists: {
          en: "Live DJ, Professional Sound System",
          ru: "Живой DJ, Профессиональная Звуковая Система",
          hy: "Կենդանի DJ, Պրոֆեսիոնալ Հնչեղային Համակարգ"
        },
        date: new Date("2025-04-05T21:00:00.000Z"),
        deposit: 3000,
        image: "/event-karaoke.jpg",
        isAdult: true,
        hall: hall._id,
        capacity: 80,
        timeStart: "21:00",
        menu: [
          {
            name: {
              en: "Beer Bucket",
              ru: "Ведро Пива",
              hy: "Գարեջրի Դույլ"
            },
            description: {
              en: "5 bottles of premium beer",
              ru: "5 бутылок премиального пива",
              hy: "5 շիշ պրեմիում գարեջուր"
            },
            price: 10000
          },
          {
            name: {
              en: "Pizza Platter",
              ru: "Пицца",
              hy: "Պիցցա"
            },
            description: {
              en: "Large pizza with your choice of toppings",
              ru: "Большая пицца с начинкой на выбор",
              hy: "Մեծ պիցցա ձեր ընտրած լցոնումով"
            },
            price: 8000
          },
          {
            name: {
              en: "Snack Mix",
              ru: "Смесь Закусок",
              hy: "Նախուտեստների Խառնուրդ"
            },
            description: {
              en: "Assorted snacks: chips, nuts, pretzels",
              ru: "Ассорти закусок: чипсы, орехи, крендельки",
              hy: "Նախուտեստների ասորտի: չիպսեր, ընկույզներ, պրեցելներ"
            },
            price: 5000
          },
          {
            name: {
              en: "Soft Drinks",
              ru: "Безалкогольные Напитки",
              hy: "Ոչ Ալկոհոլային Խմիչքներ"
            },
            description: {
              en: "Unlimited soft drinks for the evening",
              ru: "Неограниченные безалкогольные напитки на весь вечер",
              hy: "Անսահմանափակ ոչ ալկոհոլային խմիչքներ ամբողջ երեկոյի համար"
            },
            price: 3000
          }
        ],
        schema: schema2Id
      }
    ];

    // Create events one by one to ensure proper document initialization
    const events = [];
    for (const eventData of eventsData) {
      const event = await Event.create(eventData);
      events.push(event);
    }
    
    console.log(`\n✅ Created ${events.length} events:`);
    events.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.name.en} (ID: ${event._id})`);
      console.log(`      Artists: ${event.artists.en}`);
      console.log(`      Menu items: ${event.menu.length}`);
      console.log(`      Schema ID: ${event.schema}`);
    });

    console.log('\n✅ Seeding completed successfully!');
    console.log(`\nHall ID: ${hall._id}`);
    console.log(`Total Events: ${events.length}`);
    console.log(`Total Schemas: ${hall.schemas.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding hall with events:', error);
    process.exit(1);
  }
};

seedHallWithEvents();

