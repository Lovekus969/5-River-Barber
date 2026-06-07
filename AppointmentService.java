@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    public Appointment saveAppointment(
            Appointment appointment) {

        return repository.save(appointment);
    }

    public List<Appointment> getAppointments() {
        return repository.findAll();
    }
}
